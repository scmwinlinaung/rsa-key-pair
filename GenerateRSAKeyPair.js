const NodeRSA = require( 'node-rsa' );
const key = new NodeRSA( { b: 2048 } );

function GenerateRSAKeyPair ()
{
    const keys = key.generateKeyPair( 2048, 10001 );
    return { public: keys.exportKey( "pkcs8-public-pem" ), private: keys.exportKey( "pkcs8-private-pem" ) }
}



GenerateRSAKeyPair();

module.exports = { GenerateRSAKeyPair };