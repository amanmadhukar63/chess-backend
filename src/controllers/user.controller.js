

function tester(req, res){
  console.log('🙏🏼 request arrived',req.body);
  res.send('hello boy');
};

export {
  tester
};