const GAMMA = { hihi: 2000, high: 200 };
export { GAMMA };

// class ProcessVariables {
//     constructor(onComplete, onFailure ){
//         if(!onComplete){
//             this.onComplete = (res)=>{console.log(res)};
//         }
//         if(!onFailure){
//             this.onFailure = (res)=>{console.log(res)};
//         }
//         this.loaded = false;
//         this.pvs = [];
//     }
// }


// var state = false;
// var booster = [];

// const URL = "https://10.0.38.42/mgmt/bpl/getPVStatus?pv=BO*CCG*Pressure-Mon&limit=200";

// fetch(URL)
//     .then(data=>data.json())
//     .then(res=>{
//         console.log(res);
//         res.forEach(element => {
//             booster.push(element.pvName);
//         });
//         state=true;
//     })
//     .catch(exception=>console.log(exception));

// export { booster };