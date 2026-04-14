import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './BookForm.css';
const CATEGORIES = ['科幻', '文学', '历史', '传记', '技术', '其他'];
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
export default function BookForm({ book, onSubmit, onCancel }) {
    const [formData, setFormData] = useState(book || {
        id: generateId(),
        title: '',
        author: '',
        price: 0,
        category: '科幻'
    });
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = '书名不能为空';
        }
        if (!formData.author.trim()) {
            newErrors.author = '作者不能为空';
        }
        if (formData.price <= 0) {
            newErrors.price = '价格必须大于0';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({
                ...formData,
                title: formData.title.trim(),
                author: formData.author.trim()
            });
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }));
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "book-form", children: [_jsx("h2", { children: book ? '编辑书籍' : '添加新书籍' }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "title", children: "\u4E66\u540D *" }), _jsx("input", { id: "title", name: "title", type: "text", value: formData.title, onChange: handleChange, placeholder: "\u8BF7\u8F93\u5165\u4E66\u540D", className: errors.title ? 'error' : '' }), errors.title && _jsx("span", { className: "error-message", children: errors.title })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "author", children: "\u4F5C\u8005 *" }), _jsx("input", { id: "author", name: "author", type: "text", value: formData.author, onChange: handleChange, placeholder: "\u8BF7\u8F93\u5165\u4F5C\u8005\u540D", className: errors.author ? 'error' : '' }), errors.author && _jsx("span", { className: "error-message", children: errors.author })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "price", children: "\u4EF7\u683C *" }), _jsx("input", { id: "price", name: "price", type: "number", step: "0.01", value: formData.price, onChange: handleChange, placeholder: "0.00", className: errors.price ? 'error' : '' }), errors.price && _jsx("span", { className: "error-message", children: errors.price })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "category", children: "\u5206\u7C7B" }), _jsx("select", { id: "category", name: "category", value: formData.category, onChange: handleChange, children: CATEGORIES.map((cat) => (_jsx("option", { value: cat, children: cat }, cat))) })] }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary", children: book ? '更新' : '添加' }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: onCancel, children: "\u53D6\u6D88" })] })] }));
}
