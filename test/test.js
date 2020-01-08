"use strict"

var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../app");
let should = chai.should();
const expect = require('chai').expect;
 var request2 = require('supertest');
 var request = require('supertest')
chai.use(chaiHttp);
var request = request("http://localhost:8083")
var request2 = request2("http://localhost:8080")




describe('sponsors', function() {   
    describe('POST', function(){

     let email = "testService@mia.com";
     let password= "mia123";
     let token = "";

     it('Should  login', function(done){
         request2.post('/api/login')
         .send({EmailUser: email,  PasswordUser:password} )    
         .expect('Content-Type', /json/)
             .end( function(err,res){
               token=res.body.token   
               expect(res).to.have.status(200);                
              done();
             });  
         });

 it('Should  insert json sponsors', function(done){
     request.post('/api/sponsors')
     .set('Authorization', token)
     .send({
      
        NameSponsor: "test",
        DescriptSponsor: "test",
        EmailSponsor: "test@mia.com",
        ImgSponsor: "C:/PATH",
        StatusSponsor: true,
        DateEndSponsor: "2019-11-04T22:09:39.629Z",
        DateBeginSponsor: ""
     })
     .expect('Content-Type', /json/)
     .end( function(err,res){   
     expect(res).to.have.status(200);
     expect(res.body.status).to.equals("success");
     expect(res.body.message).to.equals("New sponsors created!");
     done();
 });
 });

 it('Should  not insert json sponsors why NameSponsor is empty', function(done){
     request.post('/api/sponsors')
     .set('Authorization', token)
     .send({
         
         NameSponsor: "",
         EmailSponsor:"",
         DescriptSponsor: "Duplicamos tus Megas Activa un Paquete Más Megas y disfruta del doble de Megas.",
         ImgSponsor: "C:/PATH",
         Sponsor: "Contrata un paquete Más Megas para ti o Más Megas para compartir a partir de 1000 MB y recibe por promoción, una cantidad de Megabytes (MB) adicional igual a la cantidad de MB incluidos en el paquete contratado, durante la vigencia del mismo",
         StatusSponsor: true,
         DateBeginSponsor: "2019-11-04T22:09:39.628Z",
         DateEndSponsor: "2019-11-04T22:09:39.629Z"
     })
     .expect('Content-Type', /json/)
     .end( function(err,res){
       expect(res).to.have.status(400);                
      done();
     });  
 });

 it('Should  not insert the sponsor why reques json sponsors  is empty', function(done){
     request.post('/api/sponsors')  
     .set('Authorization', token)
     .expect('Content-Type', /json/)
     .end( function(err,res){
       expect(res).to.have.status(400);                
      done();
     });  
 });
});



describe('GET', function(){
  
    let email = "testService@mia.com";
    let password= "mia123";
    let token = "";
    let id = "";

    it('Should  login', function(done){
        request2.post('/api/login')
        .send({EmailUser: email,  PasswordUser:password} )    
        .expect('Content-Type', /json/)
            .end( function(err,res){
              token=res.body.token   
              expect(res).to.have.status(200);                
             done();
            });  
        });


    it("should get a single user_email record", (done) => {                      
  
          request.get('/api/sponsors/email/test@mia.com')
          .set('Authorization', token)
           .expect('Content-Type', /json/)
           .end( function(err,res){
               id=res.body.data._id
               expect(res).to.have.status(200);
               done();
              });          
           });   


    it("should not get a single sponsors record", (done) => {
       request.get('/api/sponsors/123')
       .set('Authorization', token)
       .expect('Content-Type', /json/)
       .end( function(err,res){   
       expect(res).to.have.status(404);
       done();
   });
            });


            it("should get a single sponsors record", (done) => {
               request.get('/api/sponsors'+`/${id}`)  
               .set('Authorization', token)
               .expect('Content-Type', /json/)
               .end( function(err,res){   
             expect(res).to.have.status(200);
               done();
           });       
});


it("should get a single sponsors record", (done) => {
    request.get('/api/sponsors/1')  
    .set('Authorization', token)
    .expect('Content-Type', /json/)
    .end( function(err,res){   
  expect(res).to.have.status(404);
    done();
});       
});


}); //end get sponsor



describe('PUT', function(){
    let email = "testService@mia.com";
    let password= "mia123";
    let token = "";
    let id = "";

    it('Should  login', function(done){
        request2.post('/api/login')
        .send({EmailUser: email,  PasswordUser:password} )    
        .expect('Content-Type', /json/)
            .end( function(err,res){
                console.log(res.body.token)
              token=res.body.token   
              expect(res).to.have.status(200);                
             done();
            });  
        });


    it("should get a single user_email record", (done) => {                      
  
          request.get('/api/sponsors/email/test@mia.com')
          .set('Authorization', token)
           .expect('Content-Type', /json/)
           .end( function(err,res){
               id=res.body.data._id
               expect(res).to.have.status(200);
               done();
              });          
           });   

    
    it('Should  update json sponsors', function(done){
       request.put('/api/sponsors'+`/${id}`)
       .set('Authorization', token)
       .send({
           
           NameSponsor: "test",
           EmailSponsor:"test@mia.com",
           DescriptSponsor: "test",
           ImgSponsor: "C:/PATH",
           Sponsor: "update",
           StatusSponsor: true,
           DateEndSponsor: "2019-11-04T22:09:39.629Z"
       })
      
       .expect('Content-Type', /json/)
       .end( function(err,res){   
    
              expect(res).to.have.status(200);
       done();
    });    
    });
    
    it('Should  update json sponsors', function(done){
    
       request.put('/api/sponsors/123')
       .set('Authorization', token)
    
       .send({
           
           NameSponsor: "update",
           EmailSponsor:"faraond1@gmail.com",
           DescriptSponsor: "update",
           ImgSponsor: "C:/PATH",
           Sponsor: "update",
           StatusSponsor: true,
           DateEndSponsor: "2019-11-04T22:09:39.629Z"
       })
       .expect('Content-Type', /json/)
       .end( function(err,res){   
              expect(res).to.have.status(404);
       done();
    });    
    });
    
});//end PUT


describe('DELETE', function(){
    let email = "testService@mia.com";
    let password= "mia123";
    let token = "";
    let id ="";

    it('Should  login', function(done){
        request2.post('/api/login')
        .send({EmailUser: email,  PasswordUser:password} )    
        .expect('Content-Type', /json/)
            .end( function(err,res){
              token=res.body.token   
              expect(res).to.have.status(200);                
             done();
            });  
        });


 


    it("should get a single user_email record", (done) => {                      
        //  request.get('api/users/email'+`/${valor}`) 
          request.get('/api/sponsors/email/test@mia.com')
          .set('Authorization', token)
           .expect('Content-Type', /json/)
           .end( function(err,res){
               id=res.body.data._id
               expect(res).to.have.status(200);
               done();
              });          
           });   


    it('Should  remove json sponsors', function(done){     
      request.delete('/api/sponsors'+`/${id}`)
      .set('Authorization', token)
      .end( function(err,res){  
        expect(res).to.have.status(200);                
       done();
    });
});

    it('Should not  remove json sponsors', function(done){
        request.delete('/api/sponsors'+`/${id}`)
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .end( function(err,res){ 
            expect(res).to.have.status(500);                
           done();
        
      });
    });

});

//la funcion sponsors
});