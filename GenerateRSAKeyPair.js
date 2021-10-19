const NodeRSA = require( 'node-rsa' );
const key = new NodeRSA( { b: 2048 } );

function GenerateRSAKeyPair ()
{
    const keys = key.generateKeyPair( 2048, 10001 );
    return { public: keys.exportKey( "pkcs8-public-pem" ), private: keys.exportKey( "pkcs8-private-pem" ) }
}

function Encrypt ( base64Data, keyData )
{
    const myEncrypter = new NodeRSA( keyData, "pkcs8-public-pem" );
    const cipherText = myEncrypter.encrypt( base64Data, 'base64' );
    return cipherText;
}

function Decrypt ( base64Data, keyData )
{
    const myDecrypter = new NodeRSA( keyData );
    // myDecrypter.setOptions( { encryptionScheme: 'pkcs1' } );
    const decipherText = myDecrypter.decrypt( base64Data, 'utf8' );
    console.log( decipherText );
    return decipherText;
}

// Encrypt( "WIN LIN HEHEHE", "-----BEGIN PUBLIC KEY-----"
//     + "MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQEAqCHwqA1R/e+O6M5Pwh7Y"
//     + "r7jepq5NdYZXw6ehsf3l5aJqdKSKKo5DtAp7r3gzB91xs9H/qNM+P4Z4iB9DgDGQ"
//     + "hMX6MARRJiN56Pz2qWWA6zInJzwBW/ItsTmqY9bhRE7+xF/MmyLx/afJSV6O2UeV"
//     + "2bkxWWNKTL+Wz/qLzb/XMlIGqMMastAXIamtQwDOVEzqviBj4P3JYSPnG8fZD0Mv"
//     + "N4dVHBXhuB+iKpG+eOQjMX6qvudP94BmBp9Kx8U56tj8rMnrF+PPLWqiI3g77g/D"
//     + "EyKTyjahM69kOKuye1Wm8k+PKGd3ldU9Esk9sa3Kx1/yF30fMNsmSxWs3rFwJZF0"
//     + "/QICJxE="
//     + "----- END PUBLIC KEY-----" );
// Decrypt( cipherText,
//     "-----BEGIN PRIVATE KEY-----"
//     + "MIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCoIfCoDVH9747o"
//     + "zk/CHtivuN6mrk11hlfDp6Gx/eXlomp0pIoqjkO0CnuveDMH3XGz0f+o0z4/hniI"
//     + "H0OAMZCExfowBFEmI3no/PapZYDrMicnPAFb8i2xOapj1uFETv7EX8ybIvH9p8lJ"
//     + "Xo7ZR5XZuTFZY0pMv5bP+ovNv9cyUgaowxqy0Bchqa1DAM5UTOq+IGPg/clhI+cb"
//     + "x9kPQy83h1UcFeG4H6Iqkb545CMxfqq+50/3gGYGn0rHxTnq2PysyesX488taqIj"
//     + "eDvuD8MTIpPKNqEzr2Q4q7J7VabyT48oZ3eV1T0SyT2xrcrHX/IXfR8w2yZLFaze"
//     + "sXAlkXT9AgInEQKCAQAlL+zWnGCQu2w4tqEJogUTfRQ+XHXIB+eWtPw3IshjbNmT"
//     + "AK8iN1+u5hWsgWJ/UhN3QJh8RPDeT6gv7EsihcdyyQH3HXHcqe32qT6EVLQNAndk"
//     + "9OCi9yHi2md4z8REWdyOcczat3ssdMUUtQ092r53KbPvUeJoxjZlwGMc8hdHdia0"
//     + "B1MU2vc6ZK3AVkV+MFR+sGlnQqZ9Na43zSRA8n7KEu+f4jtcJHZINrVHtIzj6kX0"
//     + "Xtsa5oFV9nOvg1FUlk2c+orAovK1zbFmD8nU2co1Ijf9vLUX+G3tI1Cq+UbcDd1s"
//     + "Soh0isxC66oaf3EM2O6Advzv2c5LCjQi2e8zSb5hAoGBANb/ZvkOLxqS6n4Xu5u5"
//     + "rEjCzJgYSHp6596QHT9YA7O4BZC2V88u/+mc1jUeiVrQJj7B+PtfjkjYxcFXoQbW"
//     + "VWlme7lCuLWKl70Vmgw9tnZOXaT+eThCk1Nmq/bbFu06z6Cy6QCckn6qGESC8lat"
//     + "TgIBvIe+kNWi3hA3aHZr4OmfAoGBAMgyfppjJ3GkesS2vNQRvvH2jIf+/EbIbyzC"
//     + "/cuPwPA/lmUeU3mn1Kzhn5256yoMpkjvixG9r5EQTwGio9bshtafd2vdi6T/00dF"
//     + "3HlQfHOYIGJeiPgj3YrAvXXoiiSC35EKJZzW5tBCdac0nUimAH4KkNwJbJWeUVk1"
//     + "OqJ/hJPjAoGAYOlIFvqk77FxqNNhsmTyGI4SwdTVLuOrz9svTghKXY1JB48JgOSG"
//     + "S8M5+tBbMmFBIcqzCgWmFw7NGHY8p7mDCNT83o1shfJya87CtjD194jrhciVqHmL"
//     + "sXvDY9RU38JaDojOMCSVEkNnoIhudsfO5UjxIBVKXzj0QsxPpZ+xr7kCgYBEYWsb"
//     + "4NmjS/eo/eLCbtt4dCiGtinId3OcTiwlEnYRmzXAF0JsDjgbTz22WPKCa+NNQlVV"
//     + "l0iwgxmuL533wT0vLEFC643R0JXG5LFjkZKCw3XhJS3WQO4PtCBBdhr2e5fZfEKa"
//     + "EQmY0NhL84+/vDHTw52GnrKkgE77EbHjFVzeoQKBgF47O6ak/qu0vU13jlcpbntH"
//     + "T5Mk3jQjQEzP+BsyF1FfbV9z45bf0KfFsO6+rl7qUgS3xNOSQZEkeV4IRW1B8MHn"
//     + "oGgudOisDOPwUaL60ko+O4ItU/T3Z8axFLeEGlcrdMTYZIiVrD8GYPuZdG2e25i8"
//     + "RmrFyoMqop9jnxRLY8aC"
//     + "-----END PRIVATE KEY-----" )

module.exports = { GenerateRSAKeyPair, Encrypt, Decrypt };