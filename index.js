// const path = require('path');
// const fs = require('fs');

// const dirUser20 = path.join(__dirname, 'allUsers', '20');
// const dirUser18 = path.join(__dirname, 'allUsers', '18');
//
// fs.readdir(dirUser20, (err, files) => {
//     if (err) throw new Error(err);
//     files.map(value => {
//         fs.rename(path.join(__dirname, 'allUsers', '20', value), path.join(__dirname, 'allUsers', '18', value), err => {
//             if (err) throw new Error(err);
//         })
//     })
// })
//
// fs.readdir(dirUser18, (err, files) => {
//     if (err) throw new Error(err);
//
//     files.map(fileName => {
//         fs.readFile(path.join(dirUser18,fileName) , (err, data) => {
//             if (JSON.parse(data).gender == 'male') {
//                 fs.rename(path.join(__dirname,'allUsers','18',fileName), path.join(__dirname,'allUsers','20',fileName), err => {
//                     if (err) throw new Error(err);
//                 })
//                 return ;
//             }
//         })
//     })
// })

// NEXT TASK
// **********************************************************************

// const sortList = path.join(__dirname + '/zzz');
//
// function sortDir(link) {
//     fs.readdir(link, (err, files) => {
//         if (err) throw new Error(err);
//
//         files.forEach(fileName => {
//             const pathWithFile = path.join(link, fileName)
//             fs.stat(pathWithFile, (err1, stats) => {
//                 if (stats.isDirectory()) {
//                     return sortDir(pathWithFile)
//                 }
//                 const pathSortFile = path.join(__dirname, 'sortedFiles', fileName)
//                 fs.rename(pathWithFile, pathSortFile,
//                     err => {
//                         if (err) throw new Error(err);
//                     })
//
//             })
//         })
//     });
// }
//
// sortDir(sortList);
