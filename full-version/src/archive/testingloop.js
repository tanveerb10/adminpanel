// class Dog {
//   constructor(bark, biscuit) {
//     this.bark = bark
//     this.biscuit = biscuit
//   }

//   run() {
//     return this.bark + 'tabdak tabdak'
//   }
// }

// class ListNode {
//   constructor(val, next = null) {
//     this.val = val
//     this.next = next
//   }
// }

// function reverseList(head) {
//   while (head) {
//     console.log(head.val)
//     head = head.next
//   }
// }

// const list = new ListNode(1, new ListNode(2, new ListNode(3, null)))

// console.log(list)

// reverseList(list)

// // const ashish = new Dog('bhau', 4)

// // console.log(ashish.bark)

// // ashish.bhau = 'asdfasdf'
// // console.log(ashish.run())

// class KingDom {
//   constructor(king, queen) {
//     this.king = king
//     this.queen = queen
//   }
// }

// const makeJodi = new KingDom('ASISH', 'SOBO')

// console.log(makeJodi)

// const countAndPhrase = inputText => {
//   const countAnd = inputText.toLowerCase().split('and').length()
//   console.log(countAnd)
//   // return inputText.toLowerCase().split(/\band\b/).length - 1;
// }

// countAndPhrase('you and me ')

// const addressData = {
//   customer_address: [
//     {
//       _id: '670e110b154129ffb3db31e5',
//       address_name: 'office'
//     },
//     {
//       _id: '670e110b154129ffb3db31e4',
//       address_name: 'hiii'
//     }
//   ],
//   default_address: [
//     {
//       _id: '66f7bcf9e633bc0aa52d21e2',
//       firstname: 'raj',
//       lastname: 'Nimbale',
//       default_address: {
//         _id: '670e110b154129ffb3db31e4',
//         address_name: 'hiii'
//       }
//     }
//   ]
// }

// const checkDefault = addressData?.default_address[0]?.default_address._id
// if (checkDefault) {
//   // console.log(checkDefault, 'yes exist')
//   const newAddress = addressData.customer_address.filter(id => id._id === checkDefault)
//   // console.log(newAddress)
// } else {
//   // console.log('not exist')
// }

// const addBannerData = [
//   {
//     image_link: '',
//     redirect_link: ''
//   },
//   {
//     image_link: '',
//     redirect_link: ''
//   },
//   {
//     image_link: '',
//     redirect_link: ''
//   }
// ]

// const filtered = ind => {
//   console.log(ind)
//   const result = addBannerData.filter((prev, index) => index != ind)
//   return result
// }

// console.log(filtered(0))

console.log('hello world')

const rows = ['hello'].filter(Boolean).join('/')

// console.log(rows)

const inventory = [
  { name: 'apples', quantity: 2 },
  { name: 'bananas', quantity: 0 },
  { name: 'cherries', quantity: 5 }
]

const result = inventory.find(({ name }) => name === 'cherries')

console.log(result) // { name: 'cherries', quantity: 5 }
