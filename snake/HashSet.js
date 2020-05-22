class HashSet {

    constructor() {
        this.size = 10000;
        this.bucketSize = 100;
        this.data = [this.size];
        this.n = 0;
        this.initData();
    }

    initData() {
        for (let i = 0; i < this.size; ++i) {
            this.data[i] = new Bucket(this.bucketSize);
        }
    }

    add(hashableObject) {
        let idx = this.getIndexFromObject(hashableObject);
        let bucket = this.data[idx];
        bucket.add(hashableObject);
    }

    delete(hashableObject) {
        let idx = this.getIndexFromObject(hashableObject);
        this.data[idx].delete(hashableObject);
    }

    contains(hashableObject) {
        return this.getIdxInBucket(hashableObject) >= 0;
    }

    getIndexFromObject(hashableObject) {
        return hashableObject.hashCode() % 1000000007 % this.size;
    }

    getIdxInBucket(hashableObject) {
        let idx = this.getIndexFromObject(hashableObject);
        let bucket = this.data[idx];
        return bucket.getIdx(hashableObject);
    }
}

class Bucket {
    constructor(size) {
        this.size = size;
        this.n = 0;
        this.data = [this.size];
    }

    getIdx(object) {
        for (let i = 0; i < this.n; ++i) {
            if (object.equals(this.data[i])) {
                return i;
            }
        }
        return -1;
    }

    add(object) {
        if (this.n === this.size) {
            console.log("Bucket full!!!");
        } else {
            if (this.getIdx(object) < 0) {
                this.data[this.n++] = object;
            }
        }
    }

    delete(object) {
        let idx = this.getIdx(object);
        if (idx >= 0) {
            this.swapWithEnd(idx);
            this.n--;
        }
    }

    swapWithEnd(idx) {
        let tmp = this.data[idx];
        this.data[idx] = this.data[this.n - 1];
        this.data[this.n - 1] = tmp;
    }
}

// class SimpleHashableObject {
//     constructor(s) {
//         this.s = s;
//     }

//     hashCode() {
//         var h;
//         for(var i = 0, h = 0; i < this.s.length; i++)
//             h = Math.imul(31, h) + this.s.charCodeAt(i) | 0;
//         return h;
//     }

//     equals(object) {
//         return object.s === this.s;
//     }
// }

// var set = new HashSet();
// var o1 = new SimpleHashableObject("123");
// var o2 = new SimpleHashableObject("1234");
// var o3 = new SimpleHashableObject("1235");
// var o4 = new SimpleHashableObject("12367");
// var o5 = new SimpleHashableObject("123");
// var o6 = new SimpleHashableObject("111");
// set.add(o1);
// set.add(o2);
// set.add(o3);
// set.add(o4);
// console.log(set.contains(o1));
// console.log(set.contains(o2));
// console.log(set.contains(o3));
// console.log(set.contains(o4));
// console.log(set.contains(o5));
// console.log(set.contains(o6));
// set.delete(o1);
// console.log(set.contains(o1));
