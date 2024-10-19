const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../src/app');

describe('API Testing', () => {
  it('should return all items', (done) => {
    request(app)
      .get('/api/items')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1);
        done();
      });
  });

  it('should create a new item', (done) => {
    const newItem = { name: 'Item 3' };
    request(app)
      .post('/api/items')
      .send(newItem)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name', 'Item 3');
        done();
      });
  });

  // Latihan 1: Pengujian untuk menghapus item
  it('should delete an item', (done) => {
    const itemId = 1; // Pastikan ID item sesuai
    request(app)
      .delete(`/api/items/${itemId}`) // Corrected here
      .end((err, res) => {
        expect(res.status).to.equal(200); // Sesuaikan dengan status yang dikembalikan API Anda
        // Memeriksa apakah item benar-benar dihapus
        request(app)
          .get(`/api/items/${itemId}`) // Corrected here
          .end((err, res) => {
            expect(res.status).to.equal(404); // HTTP 404 Not Found setelah item dihapus
            done();
          });
      });
  });
  
  // Latihan 2: Pengujian untuk memperbarui item
  it('should update an item', (done) => {
    const newItem = { name: 'New Item' }; // Membuat item baru terlebih dahulu
    request(app)
      .post('/api/items')
      .send(newItem)
      .end((err, res) => {
        const itemId = res.body.id; // Mengambil ID dari item yang baru dibuat
        const updatedItem = { name: 'Updated Item' };
        request(app)
          .put(`/api/items/${itemId}`) // Corrected here
          .send(updatedItem)
          .end((err, res) => {
            expect(res.status).to.equal(200); // HTTP 200 OK
            expect(res.body).to.have.property('id', itemId);
            expect(res.body).to.have.property('name', 'Updated Item');
            done();
          });
      });
  });
});
