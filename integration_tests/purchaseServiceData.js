export const mockSimpleUser = {
  userId: '14',
  name: 'mockSimpleUserName',
  email: 'user@user.mock',
  isAdmin: false,
  isVerified: true,
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
};
