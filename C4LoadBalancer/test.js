// var RB = require('./out/Balancer/RandomBalancer').default;

// async function Launch(params) {
//     let Test = new RB();
//     Test.init({
//         '127.0.0.1:2001' : { weight : 1},
//         '127.0.0.1:2002' : { weight : 1},
//         '127.0.0.1:2003' : { weight : 1}
//     });

//     for (let i = 0; i < 7; i++) {
//         let CurRes = await Test.get();
//         console.log(CurRes)
//     }

//     Test.add({
//         '127.0.0.1:2004' : { weight : 2}
//     });

//     for (let i = 0; i < 8; i++) {
//         let CurRes = await Test.get();
//         console.log(CurRes)
//     }
// }

// Launch();

var HashRing = require('hashring');

function Test() {
    let data = {
        '127.0.0.1:2002' : { weight : 10},
        '127.0.0.1:2003' : { weight : 1},
        '127.0.0.1:2004' : { weight : 1},
        '127.0.0.1:2001' : { weight : 1}
    };

    let ring = new HashRing(data);

    console.log(ring.has('127.0.0.1:2003'));

    let CurDate = (new Date).getTime();
    for (let i = 0; i < 10000; i++) {
        console.log(ring.get(i));
    }

    ring.add({
        '127.0.0.1:2005' : {
            weight : 10
        },
        '127.0.0.1:2006' : {
            weight : 1
        }
    });

    for (let i = 0; i < 10000; i++) {
        console.log(ring.get(i));
    }

    let CurDate2 = (new Date).getTime();
    console.log(CurDate2 - CurDate);

    // let total = 4;

    // for (let i = 0; i < 10000; i++) {
    //     let cur = Math.random() * total;
    //     cur = parseInt(cur);
    //     for (let key in data) {
    //         cur -= data[key].weight;
    //         if (cur < 0) {
    //             console.log(key);
    //             break;
    //         }
    //     }
    // }
}

Test();
