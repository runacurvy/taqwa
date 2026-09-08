import {z} from 'zod';
import {randomUUID} from 'node:crypto';
export const inquirySchema=z.object({
 name:z.string().trim().min(2).max(150),email:z.string().email().max(254),location:z.string().trim().min(2).max(150),
 service:z.enum(['Business Launch','Project Management','Digital Transformation & AI','Something Else']),
 stage:z.enum(['I only have the idea','I have started planning','I have started building','The business already operates','I am not sure']),
 description:z.string().trim().min(20).max(6000),budget:z.enum(['Under $2,500','$2,500–$5,000','$5,000–$10,000','$10,000–$25,000','$25,000+','I would like guidance']),target:z.string().max(100),website:z.string().max(0)
});
let cachedToken=null;
async function accessToken(){
 if(cachedToken&&cachedToken.expires>Date.now()+60000)return cachedToken.value;
 const r=await fetch('http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',{headers:{'Metadata-Flavor':'Google'},signal:AbortSignal.timeout(5000)});
 if(!r.ok)throw new Error('Service identity unavailable');
 const token=await r.json();if(!token.access_token)throw new Error('Service identity unavailable');
 cachedToken={value:token.access_token,expires:Date.now()+(Number(token.expires_in)||300)*1000};return token.access_token;
}
export async function saveInquiry(values){
 const project=process.env.FIRESTORE_PROJECT_ID;
 if(!project)throw new Error('STORAGE_NOT_CONFIGURED');
 const database=encodeURIComponent(process.env.FIRESTORE_DATABASE_ID||'(default)');
 const emulator=process.env.NODE_ENV!=='production'?process.env.FIRESTORE_EMULATOR_HOST:null;
 const origin=emulator?`http://${emulator}`:'https://firestore.googleapis.com';
 const headers={'Content-Type':'application/json'};if(!emulator)headers.Authorization=`Bearer ${await accessToken()}`;
 const fields=Object.fromEntries(Object.entries(values).map(([k,v])=>[k,{stringValue:v}]));
 const r=await fetch(`${origin}/v1/projects/${encodeURIComponent(project)}/databases/${database}/documents/inquiries?documentId=${randomUUID()}`,{method:'POST',headers,body:JSON.stringify({fields}),signal:AbortSignal.timeout(10000)});
 if(!r.ok)throw new Error('STORAGE_WRITE_FAILED');
}
export async function submitInquiry(payload,save=saveInquiry){
 const parsed=inquirySchema.safeParse(payload);
 if(!parsed.success)return {status:400,body:{error:'Please check your details and add at least 20 characters about your project.'}};
 const {website,...values}=parsed.data;
 try{await save({...values,createdAt:new Date().toISOString()});return {status:200,body:{ok:true}}}
 catch{return {status:503,body:{error:'Your inquiry could not be saved. Please try again later.'}}}
}
