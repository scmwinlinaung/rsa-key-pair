const NodeRSA = require( 'node-rsa' );
const key = new NodeRSA( { b: 2048 } );

function GenerateRSAKeyPair ()
{
    const keys = key.generateKeyPair( 2048, 10001 );
    return { public: keys.exportKey( "pkcs8-public-pem" ), private: keys.exportKey( "pkcs8-private-pem" ) }
}

function Decrypt ( base64, privateKey )
{
    key.importKey( privateKey, "pkcs8-private-pem" )
    const decipherText = key.decrypt( base64, "utf8" );
    return decipherText;
}
// Decrypt( "niY8hB7HX7v0HvRUETa8dn35d677yfsyGKvTaG7H59fkLXHidQXCkIyjjZcixVyx0Rd7SgTlyJgxfOfsE2ENR2NtqcFjofPYKdUy64mKnNjLeKawPOcE5wEhImi1uw8yOz05GhAF9ExHTOsf1IcO8eEAk96Qfkler5yfbHRYBSK/hp2eeEdboj9bqEXKbeSxJWAyhEAW+3lPLI11OKvzfgPppjXNUL08OqraoFHDe96iid+8gQHM4/LgEnp+pJbE1GWsb2Lw9Q9pro9S+p4uOwUlbeBOLOiAYUaRctsPSKWrG8AlTJtdFuMv6EQF6moLQ5mpEXOyupMWt/3GaXOVvg==" )
module.exports = { GenerateRSAKeyPair };