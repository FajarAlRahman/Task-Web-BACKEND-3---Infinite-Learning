const { query } = require('../Database/db.js');

// Membuat notes baru
const addNote = async (req, res) => {
    const { title, datetime, note } = req.body;
    try {
        await query('INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)', [title, datetime, note]);
        console.log('Note baru berhasil ditambahkan...');
        res.status(201).json({ message: 'Note berhasil ditambahkan' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Gagal menambahkan note', error });
    }
};

// Menampilkan semua notes
const getNotes = async (req, res) => {
    try {
        const result = await query('SELECT * FROM notes');
        res.status(200).json({ data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Gagal mengambil notes', error });
    }
};

// Menampilkan salah satu note berdasarkan ID
const getNoteById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await query('SELECT title, datetime, note FROM notes WHERE id = ?', [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Note tidak ditemukan' });
        }
        res.status(200).json({ data: result[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Gagal mengambil note', error });
    }
};

// Mengubah notes (judul, tanggal, dan catatan)
const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, datetime, note } = req.body;
    try {
        const result = await query('UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?', [title, datetime, note, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Note tidak ditemukan' });
        }
        res.status(200).json({ message: 'Note berhasil diperbarui' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Gagal memperbarui note', error });
    }
};

// Menghapus notes
const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await query('DELETE FROM notes WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Note tidak ditemukan' });
        }
        res.status(200).json({ message: 'Note berhasil dihapus' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Gagal menghapus note', error });
    }
};

module.exports = {
    addNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
};
