var DHT = require('bittorrent-dht')
var magnet = require('magnet-uri')

var lbryMagnet = 'magnet:?xt=urn:btih:86621744602d643f8f3cf0496433f804d93323ebca45fd66b00c73dab7e08097cdabc2a2b6bbec301f2515131d8e18f6';
var uri = process.env.MAGNET || 'magnet:?xt=urn:btih:75bfa83b09757ebc7209e8a804ca8a6089367d11' || 'magnet:?xt=urn:btih:e3811b9539cacff680e418124272177c47477157'
var parsed = magnet(uri)
var PORT = process.env.PORT || 20000;
 
console.log(parsed.infoHash) // 'e3811b9539cacff680e418124272177c47477157'
 
var dht = new DHT()
 
dht.listen(PORT, function () {
  console.log('now listening on ', PORT)
})
 
dht.on('peer', function (peer, infoHash, from) {
  console.log('found potential peer ' + peer.host + ':' + peer.port + ' through ' + from.address + ':' + from.port)
})
 
// find peers for the given torrent info hash
dht.lookup(parsed.infoHash)