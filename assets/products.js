// Shared catalog: the first six supplied listings retain their original data.
// Additional listings are verified directly against the same seller's public pages.
const items=[
{title:'Leather biker jacket',subtitle:'Garment / Woman’s fit / XL',price:'€70,00',cat:'garments',url:'https://www.vinted.de/items/10202674856-leder-bikerjacke-schwarz-womans-fit-gothic-black-metal-okkulte-symbole-gr-xl',img:'https://images1.vinted.net/t/05_0134e_A79cY4FLH8oLU6JVfXHrcHC2/f800/c90f04d7.webp?s=9bb666ee6f8eee5163ecebce586a8453cd2455f7'},
{title:'Downcross T-shirt',subtitle:'Garment / Size S',price:'€10,00',cat:'garments',url:'https://www.vinted.de/items/10304272073-downcross-belarusian-black-metal-gr-s',img:'https://images1.vinted.net/t/05_007d8_Gj4yTHacPC3CokCYhrHi9B69/f800/2573807c.webp?s=3b45c0a10b3b6fe77d494b7660615d428ded025a'},
{title:'Seid — Ulv (Clear Vinyl)',subtitle:'Record / LP + Patch',price:'€20,00',cat:'records',url:'https://www.vinted.de/items/9564978421-seid-ulv-clear-vinyl-lp-embroidered-patch-collector-edition',img:'https://images1.vinted.net/t/02_00fa0_Dn88AqKSBrv5BuChjcEEEAoW/f800/02173371.webp?s=c9f66d8c07652e3a8d301832b58fbef0ea119643'},
{title:'Ana Hickmann AH1431',subtitle:'Accessories / Glasses with case',price:'€50,00',cat:'accessories',url:'https://www.vinted.de/items/9486609884-ana-hickmann-ah1431-black-gold-prescription-glasses-frame-original-case',img:'https://images1.vinted.net/t/02_007f9_UaUYxqmsPUVNeBMTBY181XUb/f800/6f5839c0.webp?s=7acb6d8eb3ef23cff2299ab7593ebc94c07e6af5'},
{title:'Stryvigor T-shirt',subtitle:'Garment / Ladies / M',price:'€7,00',cat:'garments',url:'https://www.vinted.de/items/8075332925-stryvigor-ladies-t-shirt-gr-m',img:'https://images1.vinted.net/t/06_016a9_caoMyahfoE1V9jyRu179kK4w/f800/f49f2c65.webp?s=398b1ff92f4163887039d5f8af5ad47cbdece87a'},
{title:'Vananidr — Vananidr',subtitle:'Record / Black Vinyl LP',price:'€20,00',cat:'records',url:'https://www.vinted.de/items/9565060221-vananidr-vananidr-black-vinyl-lp-atmospheric-black-metal',img:'https://images1.vinted.net/t/01_00dfe_yCNnBKhKLwHYm9ojEmERW3PC/f800/7ad0ab45.webp?s=add67b08705234afdced54d9530f3e0146b1cc27'}
];
// Optional secondary photographs, observed in the public listing gallery on 2026-10-13.
// img remains the unchanged catalog cover; pages without gallery support ignore images.
items[0].images = [
  "https://images1.vinted.net/t/05_0134e_A79cY4FLH8oLU6JVfXHrcHC2/f800/c90f04d7.webp?s=9bb666ee6f8eee5163ecebce586a8453cd2455f7",
  "https://images1.vinted.net/t/05_007e4_wjMqxfsFr5wp9ikAtTswspBc/f800/d2c3b855.webp?s=0fa5a17aa92dd1285811b4a97f753d1e935522ce",
  "https://images1.vinted.net/t/03_0160e_is4GjDtCXAxoK1wxn1qHGCTU/f800/bbfceb3f.webp?s=9dfeec8cdf11c2c79afa44c1c52df76b17a070f1",
  "https://images1.vinted.net/t/06_00220_3srNx97QUbR9DWNXLA2osNVn/f800/a4503c35.webp?s=81a98c06631d45d004dc124c6d2e3eaaf07635c5",
  "https://images1.vinted.net/t/05_00371_tYfNMifo3SoWK2gXDC23bn9B/f800/6d4bbd7d.webp?s=06b1d763a852f2c1058e968bab70760522090d7a",
  "https://images1.vinted.net/t/02_00da1_zVQ7zLcHJvzqLcD2Kxanz9Zv/f800/975c15e8.webp?s=b2249753cb25061939730e05f7f49208c6bab11c",
  "https://images1.vinted.net/t/02_00113_h6aft9238k1iopzdu16EtssA/f800/0276e6e4.webp?s=b9c083159b09cf59d363ae8d99cc9f74a2b6d18c",
  "https://images1.vinted.net/t/05_005f9_N6e8DEicDgwEjHsnqMKRmxUP/f800/fbb14d2a.webp?s=ded7fb5d7d691b35c099f1253539d529ea640889",
  "https://images1.vinted.net/t/01_007df_1HHcoy7zY9zF36zmkk5dAH91/f800/1f6e89b1.webp?s=515db6a01c79c50e721ba977bda2456c1cf2b819",
  "https://images1.vinted.net/t/06_004fd_8hwSogv5PTWKiCdppcth94og/f800/ea9091e7.webp?s=3b8a0830aa0997abe7b4cc600b2620e1a905a609",
  "https://images1.vinted.net/t/05_0005c_Acho3BeyFNpA1NJTzrLLkfQ2/f800/073d5249.webp?s=fcfc92ded8d754df89b55fb0a69523d92e8adbd2",
  "https://images1.vinted.net/t/02_01eba_4D3xb9oSEMtefma11bVG6511/f800/2a812f5c.webp?s=1d08df9aa2d13e5084ecf8c421dd741401e28a1f"
];
// Downcross - Belarusian black metal - GR. S | Vinted: original public carousel order, verified 2026-10-13.
items[1].images = [
  "https://images1.vinted.net/t/05_007d8_Gj4yTHacPC3CokCYhrHi9B69/f800/2573807c.webp?s=3b45c0a10b3b6fe77d494b7660615d428ded025a",
  "https://images1.vinted.net/t/02_00182_DJX13xBmyjNqa6LD9ndKmtFo/f800/28797619.webp?s=dd046751b0c2c08bb2bb35b8e42f9a78288bd8c6",
  "https://images1.vinted.net/t/05_0219e_wiuLnMUzQzeSJg98ADKSM98F/f800/34963627.webp?s=fa70310f4964d7738d2c544b678697b5c18afd8b"
];
// Seid — Ulv (Clear Vinyl): original public carousel order, verified 2026-10-13.
items[2].images = [
  "https://images1.vinted.net/t/02_00fa0_Dn88AqKSBrv5BuChjcEEEAoW/f800/02173371.webp?s=c9f66d8c07652e3a8d301832b58fbef0ea119643",
  "https://images1.vinted.net/t/06_01fa6_5oK3Xio4qndPXHAKQwy2XRNa/f800/ab0ebeb9.webp?s=f6567cd33cd752b15caf0aab92274126541b8cd5",
  "https://images1.vinted.net/t/06_0080a_jpkDdakNGynvWZFiXJwQiUfj/f800/361814ce.webp?s=6e3308cc264aaae36844727e66c3b0034286bf53",
  "https://images1.vinted.net/t/05_00771_3eEYjZXyyvBVArY8UUpMtQAZ/f800/7f4c3be5.webp?s=89d18484d4e9e57098bc55d1aec6d87826ad58ae",
  "https://images1.vinted.net/t/01_0239f_b7DpePNT64GoVbRLMpu1BdRL/f800/e8820aa6.webp?s=057b998a29c86a04f06d298900264096d5c2275f",
  "https://images1.vinted.net/t/01_0028c_gZcpM7C8y1SHwPP5iN2z1oQ3/f800/f98f1c79.webp?s=43c5757275aeec06f352a94a8fc0f9ef4fd65938"
];
// Ana Hickmann AH1431: original public carousel order, verified 2026-10-13.
items[3].images = [
  "https://images1.vinted.net/t/02_007f9_UaUYxqmsPUVNeBMTBY181XUb/f800/6f5839c0.webp?s=7acb6d8eb3ef23cff2299ab7593ebc94c07e6af5",
  "https://images1.vinted.net/t/06_006ec_vikC2p1Lqfs3HL3oD25y7PPa/f800/37b08d4d.webp?s=ec39a1d048f071c27a91a85167c3571457145bce",
  "https://images1.vinted.net/t/02_00c3a_6yz9GeyhnHTPz7yoVSggnMnm/f800/ea9de5a2.webp?s=239409936677c3fdebfe14296a4560cc3103c655",
  "https://images1.vinted.net/t/02_01918_22ur3vvwHKE12rhdavJV5AoK/f800/aba907bc.webp?s=8858d5957c1d2ff5d82e46ae668d70670e4aab27",
  "https://images1.vinted.net/t/02_02193_Ahct72XNqQ6vvQNEKs5YCRvG/f800/4b900a06.webp?s=79afdc059939e72a3de82e8f04f90a971991d541"
];
// Stryvigor T-shirt: original public carousel order, verified 2026-10-13.
items[4].images = [
  "https://images1.vinted.net/t/06_016a9_caoMyahfoE1V9jyRu179kK4w/f800/f49f2c65.webp?s=398b1ff92f4163887039d5f8af5ad47cbdece87a",
  "https://images1.vinted.net/t/04_022f4_VcJPUb7GTT68WKMzpoen3m4o/f800/65942d7c.webp?s=babbbb46e624c0995d456e31b3b2d7456b75960f",
  "https://images1.vinted.net/t/04_00d28_iL5Sx5vChSvh72g7MTerzbUi/f800/9ae31b3d.webp?s=ad38ab57e49fe290252c700d5570144aaa4217f0"
];
// Vananidr — Vananidr: original public carousel order, verified 2026-10-13.
items[5].images = [
  "https://images1.vinted.net/t/01_00dfe_yCNnBKhKLwHYm9ojEmERW3PC/f800/7ad0ab45.webp?s=add67b08705234afdced54d9530f3e0146b1cc27",
  "https://images1.vinted.net/t/01_00585_4AWUBuNPGqBJrWbBkXNounuU/f800/1019b5c1.webp?s=713a346aff6fbf6c8343edb2b24e9ec33d0109a1",
  "https://images1.vinted.net/t/02_0130e_DrRaHnqh3CNXAXXZ2bQUA8uC/f800/75907a4d.webp?s=8b105a5ca2ed0d0fafd1331b7f2d414bd7fb45c4"
];

// Public seller laurinhya (49274415), verified 2026-10-13.
// Names, asking prices (excluding Vinted fees), sizes and photo order are observed.
items.push(
{
  "title": "Steelfest 2023 Hoodie Ladies Fit – Black Metal Festival Merch – Size S",
  "subtitle": "Garment / Ladies fit / S",
  "price": "€20,00",
  "cat": "garments",
  "url": "https://www.vinted.de/items/10315956053-steelfest-2023-hoodie-ladies-fit-black-metal-festival-merch-size-s",
  "img": "https://images1.vinted.net/t/02_007b9_eM2wDihwJSUarXYLv4yt9dWo/f800/42236905.webp?s=9b1747af027ceec086f9cbb9dbc69ef5639394aa",
  "images": [
    "https://images1.vinted.net/t/02_007b9_eM2wDihwJSUarXYLv4yt9dWo/f800/42236905.webp?s=9b1747af027ceec086f9cbb9dbc69ef5639394aa",
    "https://images1.vinted.net/t/02_013c4_ZLR5VcaUsx1HEG9ppMCUxHLk/f800/14294afa.webp?s=954e741e18ca201c52aa26504ee128c69ebb41fd",
    "https://images1.vinted.net/t/06_0224d_EMyW3sT72b69DRbZLqmcDJ5C/f800/f2abc6c3.webp?s=53331e9be1e5bf3b5490c62c470ad871be936f6c",
    "https://images1.vinted.net/t/01_0195f_SvsP3rdJeuJtFbvXwTuQ2RDu/f800/e941671d.webp?s=bf30cecc151474e8fab8cb2c9e1d01837410489a"
  ]
},
{
  "title": "Asmoday - German Black Metal - Ladies Fit - Gr. S",
  "subtitle": "Garment / Ladies fit / S",
  "price": "€4,00",
  "cat": "garments",
  "url": "https://www.vinted.de/items/10305779792-asmoday-german-black-metal-ladies-fit-gr-s",
  "img": "https://images1.vinted.net/t/02_01eee_a4skp1FuBaetbgAC9namzGr7/f800/2a6cee03.webp?s=c22723cec26ace8c4be97c876c361010306c4577",
  "images": [
    "https://images1.vinted.net/t/02_01eee_a4skp1FuBaetbgAC9namzGr7/f800/2a6cee03.webp?s=c22723cec26ace8c4be97c876c361010306c4577",
    "https://images1.vinted.net/t/05_02420_wJhhFFen4oXRvMGiSjUPF84u/f800/a9eb968e.webp?s=ffc7ca28bd8686ae4ddc7f3f56ceca02dbfde217",
    "https://images1.vinted.net/t/02_00b19_4nUdM2MtR9jBrEcMAVVQFrat/f800/6f984706.webp?s=035323fba54a2b11d6e49ebb34f3eb15166e003b",
    "https://images1.vinted.net/t/06_02519_Q1R1ASYyHgnGXsXtZjZzKnoX/f800/55ef5681.webp?s=e92299bcfbfd0faf42d8de2c1bdb9da321ca3ac2",
    "https://images1.vinted.net/t/02_0005e_oGikzjsvXbiV2WxGmuXaKPMj/f800/aaef4dd7.webp?s=ab5d8c3a67fdcf0f04311841f7b3da3ab9c5b102"
  ]
},
{
  "title": "Cult of Fire - Czech Black Metal - Ladies Fit - Gr. S",
  "subtitle": "Garment / Ladies fit / S",
  "price": "€10,00",
  "cat": "garments",
  "url": "https://www.vinted.de/items/10304312065-cult-of-fire-czech-black-metal-ladies-fit-gr-s",
  "img": "https://images1.vinted.net/t/01_0221e_AsPRN1PAFr7qYGJ3NwkzEm8R/f800/e33d58b4.webp?s=97d9bb382d30750727f5c16dc17ef67ff28837e1",
  "images": [
    "https://images1.vinted.net/t/01_0221e_AsPRN1PAFr7qYGJ3NwkzEm8R/f800/e33d58b4.webp?s=97d9bb382d30750727f5c16dc17ef67ff28837e1",
    "https://images1.vinted.net/t/04_01c0e_2hqJbNttoSfYFgbAr96DJchz/f800/c8ef38b1.webp?s=04d8ae5a02a136e866d5e71669d72fab48f0f395"
  ]
},
{
  "title": "Vananidr - Damnation (Olive/Black Splatter LP)",
  "subtitle": "Record / Olive & black splatter LP",
  "price": "€20,00",
  "cat": "records",
  "url": "https://www.vinted.de/items/9565241519-vananidr-damnation-oliveblack-splatter-lp",
  "img": "https://images1.vinted.net/t/02_0010e_9H59tbbBMk7zaSkQttLmqRUA/f800/e37371b6.webp?s=aa499005f890499da844cdfc14001b3f6abc03e3",
  "images": [
    "https://images1.vinted.net/t/02_0010e_9H59tbbBMk7zaSkQttLmqRUA/f800/e37371b6.webp?s=aa499005f890499da844cdfc14001b3f6abc03e3",
    "https://images1.vinted.net/t/03_01340_6zDsYCqxJZSC3gEGvni4g7mj/f800/a5a86b3d.webp?s=91f1871b4388df5f491025312de1b09666c6047b",
    "https://images1.vinted.net/t/01_01dc2_AqtLtJLmy5L4t77BW1vjvpQd/f800/365159d5.webp?s=8bd82066feeb8944a01560e061975c4f9afe98d4",
    "https://images1.vinted.net/t/05_00906_cchYBXQAUvEC323MTw5qXhxV/f800/62be98b6.webp?s=fd6de16feadb73950fba4c206371aaad282fa2fe"
  ]
},
{
  "title": "Malum – Legion LP | Black Metal Vinyl",
  "subtitle": "Record / Black vinyl LP",
  "price": "€18,00",
  "cat": "records",
  "url": "https://www.vinted.de/items/9565030754-malum-legion-lp-black-metal-vinyl",
  "img": "https://images1.vinted.net/t/01_003c5_HivphUrLXDvVRHD7o7tuDYeW/f800/374aa4d5.webp?s=99e341b4d4127dab63cfff79cadd6e5b847b2d9e",
  "images": [
    "https://images1.vinted.net/t/01_003c5_HivphUrLXDvVRHD7o7tuDYeW/f800/374aa4d5.webp?s=99e341b4d4127dab63cfff79cadd6e5b847b2d9e",
    "https://images1.vinted.net/t/06_00657_w6qtPSiYKjF1PBPYswVUi4Cs/f800/fbff6870.webp?s=1f853f058a99b8d9f0a9478e4e5bbf3edc6259f6",
    "https://images1.vinted.net/t/01_00f85_7Yy7JN8K3SFxKut3rzQniLLN/f800/236228a8.webp?s=66a7d1af08311ffe23847caf1f7324a1679a397a"
  ]
},
{
  "title": "Scitalis – Awakening LP White Vinyl Black Metal Vendetta Records NEW",
  "subtitle": "Record / White vinyl LP",
  "price": "€15,00",
  "cat": "records",
  "url": "https://www.vinted.de/items/9564734810-scitalis-awakening-lp-white-vinyl-black-metal-vendetta-records-new",
  "img": "https://images1.vinted.net/t/01_01dbd_rf2Hf4GSkqsqKyYJwqtfoAKJ/f800/45787f9c.webp?s=383a151ba29f9cf361572a9f7d771f14028336c5",
  "images": [
    "https://images1.vinted.net/t/01_01dbd_rf2Hf4GSkqsqKyYJwqtfoAKJ/f800/45787f9c.webp?s=383a151ba29f9cf361572a9f7d771f14028336c5",
    "https://images1.vinted.net/t/05_01200_RMpHc2HTcXop3bJofKVjtT3f/f800/327138fa.webp?s=223ca8b561afbc74e8422167aa7e57b4d6a178ed",
    "https://images1.vinted.net/t/05_02399_5to5HFrh49tvWyh4GkbhKW6d/f800/1e7e8ea4.webp?s=1a632dd464a7ce702daaff4bbddaf4cab07436a8",
    "https://images1.vinted.net/t/05_016c6_pdEqxvWbz5hYCfvxfhwKQ5z4/f800/9caac9e9.webp?s=736d90cce8358109c12f46f5185b202388011cd9"
  ]
}
);
