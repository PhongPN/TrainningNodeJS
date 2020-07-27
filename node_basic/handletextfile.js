//Write textfile
const fs = require('fs-extra')

// let lyric = "Đưa em về chốn bao la\n"+"Nâng phím đàn\n"
//             +"Ru em về chốn muôn hoa\n"
//             +"Trong giấc ngủ ngon\n"
//             +"Về nơi ngút ngàn\n"
//             +"Giữ em về trong đời\n"
//             +"Mãi mãi hay chỉ là thoáng qua"
// fs.writeFile("mo.txt", lyric, (err)=>{
//     if(err) throw err;
//     console.log("Lyric saved");
// });

// Read file with callback
// var buf = new Buffer.alloc(1024); 

// fs.open('mo.txt', 'r+', function(err, fd) { 
//     if (err) { 
//         return console.error(err); 
//     }
//     fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
//         if (err){
//             console.log(err);
//         }
//         // In so luong byte da doc. 
//         if(bytes > 0){
//             console.log(buf.slice(0, bytes).toString()); 
//         }
//     });
// });

//Read file with promise
// const getData = (fileName, type) =>
//   new Promise((resolve, reject) =>
//     fs.readFile(fileName, type, (err, data) => {
//       //if has error reject, otherwise resolve
//       return err ? reject(err) : resolve(data);
//     })
// );

// getData('mo.txt', 'utf8')
//   .then(data => console.log(data))
//   .catch(error => console.log('Error: ', error));

//Read file with async
const getData = (fileName, type) =>
  new Promise((resolve, reject) =>
    fs.readFile(fileName, type, (err, data) => {
      //if has error reject, otherwise resolve
      return err ? reject(err) : resolve(console.log(data));
    })
);

async function readFileText(){
    await getData('mo.txt','utf8');
}

readFileText();
