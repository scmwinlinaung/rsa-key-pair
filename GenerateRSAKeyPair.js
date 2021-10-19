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
    myDecrypter.setOptions( { encryptionScheme: 'pkcs1' } );
    const decipherText = myDecrypter.decrypt( base64Data, 'utf8' );
    console.log( decipherText );
    return decipherText;
}
// Decrypt( "E8kGbXBEM06i5aFJmES2OCUOGY1UQxvdicu26pZxRMlUwpkESPRCfFvrcTcnLlyMS7j9YRlBHWSpwCZTScUtpx3cakTvZqLuLzmvtmH79vpaK7++AmfRAcutGZwRQaeAAy5DHIuExK/Pv9KqmyTsE00qNdIXY6KHBLygEoIP251V0PMZL3hJV+8ma4P+FerGpHljF1Mq4J5taqljBtKY/5wm3XGac2fS1qSnVV1o8ytrzKFo+qRZsyzJFfkoWp9hqUC2wvXf6HrEYNVObXQlM/mZwc9iyOyY3JmmeIR22wjmcgf0hZjXnoBF6DWPSfKbmkIkPaCf5mUQyL+LnvEqZQ==",
//     "-----BEGIN PRIVATE KEY-----"
//     + "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCEoUK+zBOgBXbc"
//     + "XmLLJw6NIToZMaoH1WV4ZLae//Po9oluyUQVY5sZL70wxYf0NyGMiU4d9FXg7S8e"
//     + "Pl5ySrqgyB/p823JToJTKbfqYZH/8yl1H3AT8fIKhM2hu+130DWLRuo+gKS4xEYi"
//     + "WxWk05KvLb3wVGTUz7H7GC1AGxDtTN+bgIE10yz3GD05ZvFzfZiGTRRjGP3fJ1C/"
//     + "vIir4PJVghhczestHsGfzGv95LTg2yh1RZ6jgNhiP4hoOL7D84GRY0yBMAjgUiM6"
//     + "GaDvtQiZasy9QORSscSi3f0xPSiGI50ScbQqgYJi14j++WOHPfWpEB0Uakn+jmQh"
//     + "+3/AWcBrAgInEQKCAQAupCrzndnMe6m8NHEE6fMfRurPSowk5tsJuhwG0ZnQBJTt"
//     + "nxBQhpOJxBKWb+fA4Raz1zTP/hlwelFBKH24/0Y2ZB779S4IAIBOPS5zhWZVReWm"
//     + "Gn2m0Z2BxDeFg9JevKOBnFsHAWQV+OVXQuuosrzp+jM0uTVZ92IebN6jTdZ4J6hV"
//     + "S6sE1Pr1mro6V5WCbj76ARfVM0T7G+9sjZKZCKZQQYbgR8fA6/zCYmfXEZwaWVga"
//     + "HMIIep8FDkUHTWh/LVP/5vwZ5+1L5XZVJ+JkdImLwU4GJdixbd0HDGXEvH4loTVq"
//     + "kYccEfBtOGHZ8NxvB0hi/UYE+cRRgUCwIC2N3k55AoGBAMZqM/DILzpOwmfSu5Eg"
//     + "XiZIVxciy5X5jzPLIWo8v7tkYxXpAwnomXigG34kYigmSXFvbQr8MmBlTx3sKu2V"
//     + "iXg93DCS2tRMjV8SPUB4kVAqPJGvER6npB7bpF/vd2pS3+gJ53BHRg+tnBgbuQmA"
//     + "3Nl4+qDrABynYWdeKiRYO9LdAoGBAKsfYQMjMaQvS5iaesha82o3NVZp3gtkwxuK"
//     + "bDBo1b0Sp380Qof68qyw8L1S7NNhKFzsEfkuiASqboatGADV4HqLopG6EPYsaHM5"
//     + "7qMLBDmaunFroqsRy0Qc8eScMVhJiKZrJtEnUc6+DRl9VZBuXDItq50trn2FdlO9"
//     + "JoPUxTfnAoGALqmaGhAbFGS9yDHDn2Dr7nv1dR9mYCQqLRlSk80Qf57J6+nneb4J"
//     + "HPT+JX+cN2pMz84G2xYrOtbVZyfMdQA6IcF/75LIFQ3HmuBgURnfKP6lA2qfz+s4"
//     + "VhjhNhJ73opQQGZC+L6epRrGo5sc5nY1A4Hx/T8f/13cZC409zfLGzECgYEAkUS+"
//     + "8IPOPxk59FoU8B6FElDpa5Tf32KeaUqiIklhqlyg01kVO0zuke9Cx/yFrCXjS4ed"
//     + "z1ydpwrIKLXbWHucVu585s80NNYDiD011fKfHeHh7ai0BSd//ZDaqES0A23bIur5"
//     + "TUnZOMKdLe4zCFEx4Qe4d0ALYs0KEKrCrTGXN+0CgYEAubgwO48wGMdF+DWZ7aOW"
//     + "W63BsuC7d6L6hpQoGCg8T66nrZ8wLqTsdrU+eUWMR5XgG8RL25XgHwgjxA6MnJD9"
//     + "lliYW6Crc75rQY+NkU2sn+nXKK57h+s/jO8a2pyCJKN61reJnO6VNfzJa0vMFFho"
//     + "nA/jqQ8AriKCwqapLfnWaeU="
//     + "-----END PRIVATE KEY-----" )
// Encrypt( "WIN LIN HEHEHE", "-----BEGIN PUBLIC KEY-----"
//     + "MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQEAhKFCvswToAV23F5iyycO"
//     + "jSE6GTGqB9VleGS2nv/z6PaJbslEFWObGS+9MMWH9DchjIlOHfRV4O0vHj5eckq6"
//     + "oMgf6fNtyU6CUym36mGR//MpdR9wE/HyCoTNobvtd9A1i0bqPoCkuMRGIlsVpNOS"
//     + "ry298FRk1M+x+xgtQBsQ7Uzfm4CBNdMs9xg9OWbxc32Yhk0UYxj93ydQv7yIq+Dy"
//     + "VYIYXM3rLR7Bn8xr/eS04NsodUWeo4DYYj+IaDi+w/OBkWNMgTAI4FIjOhmg77UI"
//     + "mWrMvUDkUrHEot39MT0ohiOdEnG0KoGCYteI/vljhz31qRAdFGpJ/o5kIft/wFnA"
//     + "awICJxE="
//     + "-----END PUBLIC KEY-----" );


module.exports = { GenerateRSAKeyPair, Encrypt, Decrypt };