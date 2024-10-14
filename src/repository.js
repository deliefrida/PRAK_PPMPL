class PrimaryRepository {
  constructor() {
    // Simulasi database menggunakan array
    this.items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ];
  }

  getItemById(id) {
    return this.items.find(item => item.id === id) || null;
  }

  // Metode untuk menghapus item berdasarkan ID
  deleteItemById(id) {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Item not found');
    }
    // Menghapus item dari array dan mengembalikannya
    return this.items.splice(index, 1)[0];
  }
}

module.exports = PrimaryRepository;
