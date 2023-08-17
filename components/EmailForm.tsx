import { useState } from 'react';
import axios from 'axios';

const EmailForm: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const handleSendEmail = async () => {
    try {
      await axios.post('http://localhost:4000/email/send', { recipient, subject, text });
     
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className='text-center'>Compose mail</h2>
      <div className="mb-3">
        <label className="form-label">Recipient</label>
        <input
          type="email"
          className="form-control"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Subject</label>
        <input
          type="text"
          className="form-control"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Message</label>
        <textarea
          className="form-control h-200"
          placeholder="Message"
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSendEmail}>
        Send Email
      </button>
    </div>
  );
};

export default EmailForm;
