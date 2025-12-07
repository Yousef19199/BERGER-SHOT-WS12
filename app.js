const CONTACT_NUMBER='7676767';
const STORAGE_KEYS={admin:'bs_admin',employees:'bs_employees',orders:'bs_orders'};
async function hashString(str){const enc=new TextEncoder();const data=enc.encode(str);const hash=await crypto.subtle.digest('SHA-256',data);return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');}
function getAdmin(){try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.admin)||'null')}catch(e){return null}}
async function createAdmin(username,password){if(getAdmin()) return false;const passHash=await hashString(password);localStorage.setItem(STORAGE_KEYS.admin,JSON.stringify({username,passHash}));return true;}
async function loginUser(username,password,asAdmin=false){const hash=await hashString(password);if(asAdmin){const admin=getAdmin();if(!admin) return false;return admin.username===username&&admin.passHash===hash;}else{const users=getAllEmployees();return!!users.find(u=>u.username===username&&u.passHash===hash)}}
function getAllEmployees(){try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.employees)||'[]')}catch(e){return []}}
async function addEmployee(username,password){const users=getAllEmployees();if(users.find(u=>u.username===username)) return false;const passHash=await hashString(password);users.push({username,passHash});localStorage.setItem(STORAGE_KEYS.employees,JSON.stringify(users));return true;}
function removeEmployee(username){let users=getAllEmployees();users=users.filter(u=>u.username!==username);localStorage.setItem(STORAGE_KEYS.employees,JSON.stringify(users));}
function getAllOrders(){try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.orders)||'[]')}catch(e){return []}}
function pushOrder(order){const arr=getAllOrders();arr.unshift(order);localStorage.setItem(STORAGE_KEYS.orders,JSON.stringify(arr))}
function generateOrderNumber(){return Math.floor(100000+Math.random()*900000).toString();}
function markOrderCompleted(id){const arr=getAllOrders();const idx=arr.findIndex(o=>o.id==id);if(idx>=0){arr[idx].status='مكتمل';localStorage.setItem(STORAGE_KEYS.orders,JSON.stringify(arr))}}
function clearOrders(){localStorage.removeItem(STORAGE_KEYS.orders)}
window.getAdmin=getAdmin;window.createAdmin=createAdmin;window.loginUser=loginUser;
window.getAllEmployees=getAllEmployees;window.addEmployee=addEmployee;window.removeEmployee=removeEmployee;
window.getAllOrders=getAllOrders;window.push
