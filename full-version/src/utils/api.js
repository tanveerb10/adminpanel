export const fetchInitialData = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          storeAddress: '123 Main St',
          storeEmail: 'store@example.com',
          storeName: 'John',
          storePhoneNumber: '1234567890',
          legalAddress: '235 Anderi',
          legalEmail: 'legal@example.com',
          legalPhoneNumber: '1234567890',
          legalName: 'Livein'
        })
      }, 5000)
    })
  }
  