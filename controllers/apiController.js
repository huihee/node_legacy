const contactModel = require('../models/contactModel')

// 데이터 조회 API Controller
const getContacts = (req, res) => {
    contactModel.getContacts((err, result) => {
        if(err) {
            console.error('데이터 조회중 에러 발생', err);
            return res.status(500).send('내부 서버 오류')
        }
        res.json(result);
    })
}

// 데이터 삽입 API Controller
const addContact = (req, res) => {
    const contact = {
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
        memo : req.body.memo
    };

    contactModel.addContact(contact, (err, result) => {
        if(err) {
            console.error('데이터 삽입중 에러 발생', err);
            return res.status(500).send('내부 서버 오류')
        }
        res.status(201).json({ message: '문의사항이 등록 되었습니다', contactId: result.insertId });
        // 201 : create(생성)
    })
}

// 데이터 수정 API Controller
const updateContact = (req, res) => {
    const id = req.prams.id;

    contactModel.updateContactStatus(id, (err, result) => {
        if(err) {
            console.error('데이터 삽입중 에러 발생', err);
            return res.status(500).send('내부 서버 오류')
        }
        res.status(200).json({ message: '문의사항이 업데이트 되었습니다', contactId: result.insertId });
        // 200 : 요청성공
    })
}

// 데이터 삭제 API Controller
const deleteContact = (req, res) => {
    const id = req.prams.id;

    contactModel.deleteContact(id, (err, result) => {
        if(err) {
            console.error('데이터 삭제중 에러 발생', err);
            return res.status(500).send('내부 서버 오류')
        }
        res.status(200).json({ message: '문의사항이 삭제 되었습니다' });
        // 200 : 요청성공
    })
}

module.exports = {
    getContacts,
    addContact,
    updateContact,
    deleteContact
}