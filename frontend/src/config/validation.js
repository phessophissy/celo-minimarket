export const PRODUCT_RULES = {
  name: { required: true, minLength: 2, maxLength: 100 },
  price: { required: true, min: 0.001, max: 1000 },
  description: { required: false, maxLength: 500 },
  image: { required: true, maxSizeKB: 256, types: ['image/png','image/jpeg','image/gif','image/webp'] },
};
export function validateField(field, value) {
  const r = PRODUCT_RULES[field]; if(!r) return {valid:true};
  if(r.required && (!value||(typeof value==='string'&&!value.trim()))) return {valid:false,error:`${field} is required`};
  if(typeof value==='string' && r.minLength && value.length<r.minLength) return {valid:false,error:`${field} too short`};
  if(typeof value==='string' && r.maxLength && value.length>r.maxLength) return {valid:false,error:`${field} too long`};
  if(typeof value==='number' && r.min!==undefined && value<r.min) return {valid:false,error:`${field} below minimum`};
  if(typeof value==='number' && r.max!==undefined && value>r.max) return {valid:false,error:`${field} above maximum`};
  return {valid:true};
}
export function validateProduct(data) {
  const errors={};
  for(const f of Object.keys(PRODUCT_RULES)){const res=validateField(f,data[f]);if(!res.valid) errors[f]=res.error;}
  return {valid:Object.keys(errors).length===0, errors};
}
