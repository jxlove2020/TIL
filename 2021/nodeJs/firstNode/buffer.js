const buffer = Buffer.from('버퍼로 바뀝니다');
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString);

const array = [Buffer.from('띄엄 '),Buffer.from('띄엄 '),Buffer.from('띄어쓰기')];
console.log(Buffer.concat(array).toString());

// 데이터는 없는데 빈 버퍼 5 Byte를 만들 때
console.log(Buffer.alloc(5));