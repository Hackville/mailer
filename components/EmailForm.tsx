import { useState } from 'react';
import axios from 'axios';

const EmailForm: React.FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = async () => {
    try {
      setSending(true);
      await axios.post('https://email-backend-pz6o.onrender.com/email/send', { from, to, subject, text });
      setEmailSent(true);
      setFrom('');
      setTo(''); // Reset 'to' field
      setSubject(''); // Reset 'subject' field
      setText(''); // Reset 'text' field
      setTimeout(() => {
        setEmailSent(false); // Hide the success message after 5 seconds
      }, 5000);
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className='text-center'>Compose mail</h2>
      <div className="mb-3">
        <label className="form-label">From</label>
        <input
          type="text"
          className="form-control"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Recipient</label>
        <input
          type="email"
          className="form-control"
          placeholder="Recipient"
          value={to}
          onChange={(e) => setTo(e.target.value)}
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
        {sending ? 'Sending...' : 'Send Email'}
      </button>
      {emailSent && (
        <div className="alert alert-success mt-3" role="alert">
          Email sent successfully!
        </div>
      )}
    </div>
  );
};

export default EmailForm;
