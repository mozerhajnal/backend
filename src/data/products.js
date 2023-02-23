const products = [
  {
    name: 'Aurora Borealis medál',
    sku: '1245.45',
    price: 15000,
    quantity: 5,
    description: 'Csillogó türkiz színű medál különleges akasztóval.',
    type: 'necklace',
    productImage: [
      'https://trinwoodart.s3.amazonaws.com/masterwork/uploadImages-1655669066222.jpg',
      'https://trinwoodart.s3.amazonaws.com/masterwork/uploadImages-1655669066301.jpg',
      'https://trinwoodart.s3.amazonaws.com/masterwork/uploadImages-1655669066335.jpg',
      'https://trinwoodart.s3.amazonaws.com/masterwork/uploadImages-1655669066343.jpg',
    ],
  },
  {
    name: 'Smaragd zöld medál',
    sku: '4578.2',
    price: 15000,
    quantity: 5,
    description:
      'Csillogó smaragd színű fából és gyantából készült medál különleges akasztóval.',
    type: 'necklace',
    productImage: [
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655669492196.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655669492213.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655669492225.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655669492256.jpg',
    ],
  },
  {
    name: 'Laptop medál',
    sku: '4578,5',
    price: 15000,
    quantity: 5,
    description:
      'Csillogó laptop alkatrészből, fából és gyantából készült medál különleges akasztóval.',
    type: 'necklace',
    productImage: [
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655669819829.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655669819856.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655669819862.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655669819868.jpg',
    ],
  },
  {
    name: 'Nagy laptop medál',
    sku: '4587.4',
    price: 15000,
    quantity: 5,
    description:
      'Csillogó laptop alkatrészből, fából és gyantából készült medál különleges akasztóval.',
    type: 'necklace',
    productImage: [
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670085062.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670085086.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670085102.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670085117.jpg',
    ],
  },
  {
    name: 'Aurora australis medál',
    sku: '1254.3',
    price: 15000,
    quantity: 5,
    description:
      'Csillogó smaragd színű fából és gyantából készült medál különleges akasztóval.',
    type: 'necklace',
    productImage: [
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670189001.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670189012.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670189022.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670189035.jpg',
    ],
  },
  {
    name: 'Fele fa medál',
    sku: '4578.2',
    price: 15000,
    quantity: 5,
    description:
      'Csillogó smaragd színű fából és gyantából készült medál különleges akasztóval.',
    type: 'necklace',
    productImage: [
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670249065.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670249077.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670249092.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670249113.jpg',
    ],
  },
  {
    name: 'Ezüst gyűrűsdobozka',
    sku: '4562.4',
    price: 15000,
    quantity: 5,
    description:
      'Csillogó ezüst színű fából és gyantából készült gyűrűsdobozka.',
    type: 'ringbox',
    productImage: [
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670343392.1.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670343395.1.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670343400.1.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670343416.1.jpg',
    ],
  },
  {
    name: 'Kerek gyűrűsdobozka',
    sku: '4578.5',
    price: 15000,
    quantity: 5,
    description:
      'Csillogó smaragd színű fából és gyantából készült különleges gyűrűsdobozka.',
    type: 'ringbox',
    productImage: [
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670586843.1.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670586846.1.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670586859.1.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655670586864.1.jpg',
    ],
  },
  {
    name: 'Gyűrűs dobozka',
    sku: '1245.5',
    price: 15000,
    quantity: 5,
    description:
      'Csillogó kék színű fából és gyantából készült különleges gyűrűsdobozka.',
    type: 'ringbox',
    productImage: [
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655671002278.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655671002282.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655671002288.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655671002305.jpg',
    ],
  },
  {
    name: 'Havas gyűrű',
    sku: '1245.5',
    price: 15000,
    quantity: 5,
    description: 'Fából és gyantából készült különleges gyűrű.',
    type: 'ring',
    productImage: [
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655672045314.1.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655672045410.1.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655672045432.1.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655672045455.1.jpg',
    ],
  },
  {
    name: 'Smaragd gyűrű',
    sku: '1245.5',
    price: 15000,
    quantity: 5,
    description: 'Fából és gyantából készült különleges smaragd gyűrű.',
    type: 'ring',
    productImage: [
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655673159923.1.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655673159965.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655673159979.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655673160029.jpg',
    ],
  },
  {
    name: 'Virágos gyűrű',
    sku: '1545.4',
    price: 15000,
    quantity: 5,
    description: 'Fából és gyantából készült különleges virágos gyűrű.',
    type: 'ring',
    productImage: [
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655673207889.1.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655673207900.1.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655673207919.1.jpg',
      'https://trinwoodart.s3.eu-west-2.amazonaws.com/masterwork/uploadImages-1655673207933.1.jpg',
    ],
  },
];

export default products;
