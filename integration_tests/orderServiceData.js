export const invalidUserId = '6274212b61ef90a601d53c1k';
export const validUserId = '62a5f85ac5ce2dc531372168';

export const mockSimpleUser = {
  userId: '14',
  name: 'mockSimpleUserName',
  email: 'user@user.mock',
  isAdmin: false,
  isVerified: true,
};

export const mockedOrderFindOrder = {
  _id: 12,
  name: 'dummyName',
  status: 'pending',
  orderDate: '2022.01.01',
  price: 500,
};

export const responseOrder = {
  id: 12,
  name: 'dummyName',
  status: 'pending',
  orderDate: '2022.01.01',
  price: 500,
};

export const mockProductData = {
  id: 1,
  name: 'Wood resin necklace',
  sku: 1245.45,
  price: 36,
  quantity: 24,
  description: 'Handmade wood resin necklace',
  type: 'necklace',
  productImage: [
    'https://trinwoodart.s3.amazonaws.com/uploadImages-1654502929073.jpg',
    'https://trinwoodart.s3.amazonaws.com/uploadImages-1654502929105.jpg',
    'https://trinwoodart.s3.amazonaws.com/uploadImages-1654502929225.jpg',
  ],
};

export const mockSavedOrder = {
  id: 1,
  userId: 2,
  status: 'pending',
  orderDate: '2021.03.30',
  name: 'Wood resin necklace',
  price: 390,
  quantity: 1,
  productImage: [
    'https://trinwoodart.s3.amazonaws.com/uploadImages-1654502929073.jpg',
    'https://trinwoodart.s3.amazonaws.com/uploadImages-1654502929105.jpg',
    'https://trinwoodart.s3.amazonaws.com/uploadImages-1654502929225.jpg',
  ],
  productId: 2,
};

export const mockedResObj = {
  status: 'pending',
  orderDate: '2021.03.30',
  name: 'Wood resin necklace',
  price: 390,
  quantity: 1,
};

export const mockPaidOrder = {
  id: 1,
  userId: 2,
  status: 'pending',
  orderDate: '2021.03.30',
  name: 'Wood resin necklace',
  price: 390,
  quantity: 1,
  productImage: [
    'https://trinwoodart.s3.amazonaws.com/uploadImages-1654502929073.jpg',
    'https://trinwoodart.s3.amazonaws.com/uploadImages-1654502929105.jpg',
    'https://trinwoodart.s3.amazonaws.com/uploadImages-1654502929225.jpg',
  ],
  productId: 2,
};

export const mockPurchaseResponse = {
        status: 'paid',
        paidDate: '2022-06-18T22:53:15.494Z',
        paidAmount: 390,
        _id: "62ae575b80635c814732004b"
    
};

export const mockPurchase = {
  _id: '62ae5231676b8016d565c4ac',
  userId: '62a5f85ac5ce2dc531372168',
  status: 'paid',
  paidDate: '2022-06-18T22:31:13.708Z',
  paidAmount: 130,
  productId: {
    _id:'62ac8511d35fbb5828dfc194',
    name: 'jó példa',
    sku: '125',
    price: 65,
    quantity: 4,
    description:
      'Are you looking for unique accessories to elevate your casual/evening look?',
    type: 'necklace',
    productImage: [
      'https://trinwoodart.s3.amazonaws.com/uploadImages-1654502929073.jpg',
      'https://trinwoodart.s3.amazonaws.com/uploadImages-1654502929105.jpg',
      'https://trinwoodart.s3.amazonaws.com/uploadImages-1654502929225.jpg',
    ],
  },
}