import React, { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Message sent! We will get back to you soon.');
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF8DC] px-4 py-8">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#6C0345]">Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-lg font-medium text-[#6C0345] mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC6B19]"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg font-medium text-[#6C0345] mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC6B19]"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-lg font-medium text-[#6C0345] mb-2">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC6B19]"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#DC6B19] text-white py-3 rounded-md text-lg font-semibold transition duration-300 ease-in-out hover:bg-[#F7C566] hover:text-[#6C0345]"
                    >
                        Send Message
                    </button>
                </form>
            </div>
            <div className="text-center mt-6">
                <p className="text-lg font-medium text-[#6C0345]">Alternatively, you can reach us at:</p>
                <p className="text-lg text-[#6C0345]">Email: contact@optidecision.com</p>
                <p className="text-lg text-[#6C0345]">Phone: (123) 456-7890</p>
            </div>
        </div>
    );
}

export default Contact;
