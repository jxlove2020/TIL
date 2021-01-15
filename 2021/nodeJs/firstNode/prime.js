const min = 2;
const max = 10_000_000;
const primes = [];

// 소수 찾기 // 에라토스테네스의 체
function generatePrimes(start, range) {
    let isPrime = true;
    const end = start + range;
    for(let i = start; i < end; i++) {
        for(let j = min; j < Math.sqrt(end); j++) {
            if ( i !== j && i % j === 0 ){
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
        isPrime = true;
    }
}

console.log('소수찾기 시작 -- 시간이 오래걸릴 수 있습니다. 10~30초 기다려 주세요');
console.time('prime');
generatePrimes(min, max);
console.timeEnd('prime');
console.log(primes.length);