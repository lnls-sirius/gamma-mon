import {jlab} from '../vendor/epics2web';

import {network} from '../utils/Network';

class Epics {
    constructor(monitoredPVsList){
        this.monitoredPVsList = monitoredPVsList;

        this.con = new jlab.epics2web.ClientConnection(network.epics2webOptions);
        this.con.monitorPvs(this.monitoredPVsList);

        this.con.onupdate = function (e) {
            console.log('Update');
            console.log('PV Name: ' + e.detail.pv);
            console.log('Date: ' + e.detail.date);
            console.log('PV Value: ' + e.detail.value);
        };

        
    }
}
export default Epics;

// var options = {},
// monitoredPvs = ['mypvname1', 'mypvname2'],
// con = new jlab.epics2web.ClientConnection({});

// con.onopen = function (e) {
//     console.log('Socket Connected');
//     con.monitorPvs(monitoredPvs);
// };

// con.onupdate = function (e) {
//     console.log('Update');
//     console.log('PV Name: ' + e.detail.pv);
//     console.log('Date: ' + e.detail.date);
//     console.log('PV Value: ' + e.detail.value);
// };

// con.oninfo = function (e) {
//     console.log('Info');
//     console.log('PV Name: ' + e.detail.pv);
//     console.log('Connected: ' + e.detail.connected);
//     console.log('PV Type: ' + e.detail.datatype);
     
//     if (typeof e.detail['enum-labels'] !== 'undefined') {
//         console.log('Enum Labels: ' + e.detail['enum-labels']);
//     }    
// };