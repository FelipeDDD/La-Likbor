# Outlines from the local Garamond font. No font file is copied or distributed.
# Windows is needed to rebuild; the resulting SVGs have no font dependency.
param([string]$OutputDirectory = $PSScriptRoot)
Add-Type -AssemblyName System.Drawing
$family = [System.Drawing.FontFamily]::new('Garamond')
$outline = [System.Drawing.Drawing2D.GraphicsPath]::new()
$format = [System.Drawing.StringFormat]::GenericTypographic.Clone()
$outline.AddString('La Likbør', $family, 0, 160, [System.Drawing.PointF]::new(0,0), $format)
$bounds = $outline.GetBounds()
$points = $outline.PathPoints
$types = $outline.PathTypes
$culture = [System.Globalization.CultureInfo]::InvariantCulture
function Format-Coordinate($value) { return $value.ToString('0.###', $culture) }
function Point-Text($point) { return ('{0} {1}' -f (Format-Coordinate $point.X), (Format-Coordinate $point.Y)) }
$segments = [System.Collections.Generic.List[string]]::new()
for ($i=0; $i -lt $points.Length; $i++) {
  $kind = $types[$i] -band 7
  if ($kind -eq 0) { $segments.Add('M' + (Point-Text $points[$i])) }
  elseif ($kind -eq 1) { $segments.Add('L' + (Point-Text $points[$i])) }
  elseif ($kind -eq 3) {
    $segments.Add('C' + (Point-Text $points[$i]) + ' ' + (Point-Text $points[$i+1]) + ' ' + (Point-Text $points[$i+2]))
    $i += 2
  }
  if (($types[$i] -band 128) -ne 0) { $segments.Add('Z') }
}
$translateX = Format-Coordinate (12-$bounds.X)
$translateY = Format-Coordinate (12-$bounds.Y)
$width = Format-Coordinate ($bounds.Width+24)
$height = Format-Coordinate ($bounds.Height+24)
foreach ($variant in @(@('ivory','#ded2c2'),@('bronze','#a78a65'))) {
  $svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {0} {1}" role="img" aria-labelledby="title desc"><title id="title">La Likbør</title><desc id="desc">Gothic editorial wordmark study. Garamond outlines, original ø, transparent background. {2}.</desc><path fill="{3}" fill-rule="evenodd" transform="translate({4} {5})" d="{6}"/></svg>' -f $width,$height,$variant[0],$variant[1],$translateX,$translateY,($segments -join '')
  [System.IO.File]::WriteAllText((Join-Path $OutputDirectory ('la-likbor-editorial-' + $variant[0] + '.svg')), $svg, [System.Text.UTF8Encoding]::new($false))
}
$outline.Dispose()
$family.Dispose()
$format.Dispose()
Write-Output 'Editorial: two standalone transparent SVG variants.'
