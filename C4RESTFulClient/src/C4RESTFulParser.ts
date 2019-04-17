import Http                 = require('http');

export default interface C4RESTFulParser {
    name : string,
    isDefault ?: boolean,
    contentTypes ?: string[],
    match ?: (response : Http.ClientResponse) => boolean,
    parse ?: (byteBuffer : Buffer, nrcEventEmitter : any, parsedCallback : any) => void
}