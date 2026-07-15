import { useState } from 'react';

import {
  ShoppingBag,
  User,
  MapPin,
  Info,
  Rocket,
  ChevronDown,
  Bell,
  Search,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function CreateListing() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: 'offer',
    title: '',
    category: '',
    tags: '',
    description: '',
    experienceLevel: '',
    availability: '',
    price: '',
    location: '',
    radius: 10,
    useCurrentLocation: true
  });

  const nextStep = () => setStep(s => Math.min(4, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const steps = [
    { num: 1, title: 'Type' },
    { num: 2, title: 'Details' },
    { num: 3, title: 'Location' },
    { num: 4, title: 'Publish' },
  ];

  const categoryImages = {
    music: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=400&h=300",
    programming: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400&h=300",
    language: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400&h=300",
    art: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400&h=300",
    business: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400&h=300",
    marketing: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80&w=400&h=300",
    photography: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400&h=300",
    writing: "https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=400&h=300",
    lifestyle: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=400&h=300",
    other: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400&h=300",
    default: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400&h=300"
  };
  const previewImage = categoryImages[formData.category] || categoryImages.default;

  const parsedTags = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  const displayTags = parsedTags.length > 0 ? parsedTags : ['beginner'];
  const categoryDisplay = formData.category ? formData.category.charAt(0).toUpperCase() + formData.category.slice(1) : 'General';

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <span className="text-xl">⌘</span>
            </div>
            SkillSphere
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600 font-medium">
            <a href="#" className="hover:text-indigo-600">Features</a>
            <a href="#" className="hover:text-indigo-600">Courses</a>
            <a href="#" className="hover:text-indigo-600">Pricing</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-gray-600">
            <Bell size={20} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img src="https://i.pravatar.cc/100" alt="avatar" className="w-full h-full object-cover" />
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 relative overflow-hidden">

          {/* Stepper */}
          <div className="mb-10">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-gray-100 z-0"></div>
              {steps.map((s) => {

                const isActive = step === s.num;
                const isPast = step > s.num;
                return (
                  <div key={s.num} className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                      ${isActive ? 'bg-indigo-600 text-white border-2 border-indigo-600' :
                        isPast ? 'bg-indigo-600 text-white border-2 border-indigo-600' :
                          'bg-white text-gray-400 border-2 border-gray-200'}`}>
                      {isPast ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> : s.num}
                    </div>
                    <span className={`text-xs font-medium ${isActive || isPast ? 'text-indigo-600' : 'text-gray-400'}`}>
                      {s.num}. {s.title}
                    </span>
                  </div>
                )
              })}
              {/* Progress bar overlay */}
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-indigo-600 z-0 transition-all duration-300"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          <div className="min-h-[400px]">
            {step === 1 && (
              <div className="animate-in fade-in duration-500">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Create a New Listing</h1>
                <p className="text-gray-500 mb-8 text-sm">Choose the type of listing you want to create.</p>

                <div className="grid gap-4 mb-8">
                  <label className={`relative flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all
                    ${formData.type === 'offer' ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-100 hover:border-gray-200'}
                  `}>
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                      <ShoppingBag size={24} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-1">Offer (I can teach)</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">Create a listing to offer your skills and services to others.</p>
                    </div>
                    <div className="shrink-0 flex items-center justify-center pt-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${formData.type === 'offer' ? 'border-indigo-600' : 'border-gray-300'}`}>
                        {formData.type === 'offer' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>}
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="type"
                      value="offer"
                      checked={formData.type === 'offer'}
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>

                  <label className={`relative flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all
                    ${formData.type === 'request' ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-100 hover:border-gray-200'}
                  `}>
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
                      <User size={24} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-1">Request (I need)</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">Create a listing to find someone who can help you.</p>
                    </div>
                    <div className="shrink-0 flex items-center justify-center pt-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${formData.type === 'request' ? 'border-indigo-600' : 'border-gray-300'}`}>
                        {formData.type === 'request' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>}
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="type"
                      value="request"
                      checked={formData.type === 'request'}
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Decorative illustration */}
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-50/50 rounded-tr-full -z-10 pointer-events-none"></div>

                <div className="flex justify-end mt-12">
                  <button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors">
                    Next <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in duration-500">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Listing Details</h1>
                <p className="text-gray-500 mb-8 text-sm">Provide the basic information about your listing.</p>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        maxLength={60}
                        placeholder="e.g. Guitar Lessons for Beginners"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder:text-gray-300 text-sm"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        {formData.title.length}/60
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                    <div className="relative">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all appearance-none text-sm bg-white"
                      >
                        <option value="" disabled>Select Category</option>
                        <option value="music">Music</option>
                        <option value="programming">Programming</option>
                        <option value="language">Language</option>
                        <option value="art">Art & Design</option>
                        <option value="business">Business</option>
                        <option value="marketing">Marketing</option>
                        <option value="photography">Photography</option>
                        <option value="writing">Writing</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <div className="relative">
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="Add tags (e.g. music, guitar, beginner)"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder:text-gray-300 text-sm"
                      />
                    </div>
                    <div className="flex justify-between items-center mt-1.5">
                      <span className="text-xs text-gray-400">Add up to 5 tags</span>
                      <span className="text-xs text-gray-400">0/5</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                    <div className="relative">
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        maxLength={500}
                        placeholder="Describe what you can teach or what you need..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder:text-gray-300 text-sm resize-none"
                      />
                      <span className="absolute right-3 bottom-3 text-xs text-gray-400 bg-white px-1">
                        {formData.description.length}/500
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Experience Level</label>
                      <div className="relative">
                        <select
                          name="experienceLevel"
                          value={formData.experienceLevel}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all appearance-none text-sm bg-white"
                        >
                          <option value="" disabled>Select experience level</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="expert">Expert</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Availability</label>
                      <div className="relative">
                        <select
                          name="availability"
                          value={formData.availability}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all appearance-none text-sm bg-white"
                        >
                          <option value="" disabled>Select availability</option>
                          <option value="weekdays">Weekdays</option>
                          <option value="weekends">Weekends</option>
                          <option value="flexible">Flexible</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Price / Rate <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g. $20 per hour"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder:text-gray-300 text-sm"
                    />
                    <span className="text-xs text-gray-400 mt-1.5 block">Leave empty if not applicable</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
                  <button onClick={prevStep} className="text-gray-500 hover:text-gray-800 font-medium flex items-center gap-2 px-4 py-2 transition-colors text-sm">
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm">
                    Next <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in duration-500">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Location</h1>
                <p className="text-gray-500 mb-8 text-sm">Where is your listing available?</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Select your city"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder:text-gray-300 text-sm"
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200">
                    <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiAvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iI2U1ZTdlYiIgc3Ryb2tlLXdpZHRoPSIxIiAvPgo8L3N2Zz4=')]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative flex flex-col items-center">
                        <MapPin className="text-indigo-600 fill-indigo-100 w-10 h-10 -mt-10 relative z-10" />
                        <div className="w-4 h-1 bg-black/20 rounded-full blur-[2px] absolute -bottom-1"></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-sm font-medium text-gray-700">Radius</label>
                      <span className="text-sm font-medium text-indigo-600">{formData.radius} km</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-400">5 km</span>
                      <input
                        type="range"
                        name="radius"
                        min="5"
                        max="50"
                        value={formData.radius}
                        onChange={handleChange}
                        className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <span className="text-xs text-gray-400">50 km</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Use My Current Location</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Automatically detect your location</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="useCurrentLocation"
                        checked={formData.useCurrentLocation}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                </div>

                <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
                  <button onClick={prevStep} className="text-gray-500 hover:text-gray-800 font-medium flex items-center gap-2 px-4 py-2 transition-colors text-sm">
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm">
                    Next <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-in fade-in duration-500">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Publish Listing</h1>
                <p className="text-gray-500 mb-8 text-sm">Review your listing before publishing.</p>

                <div className="space-y-6">
                  {/* Preview Card */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Preview</h3>
                    <div className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row gap-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-full md:w-40 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-900 text-lg leading-tight">
                            {formData.title || 'Guitar Lessons for Beginners'}
                          </h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                            {formData.type === 'offer' ? 'Offer (I can teach)' : 'Request (I need)'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">
                          {categoryDisplay} • {displayTags.join(' • ')}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <MapPin size={14} />
                            <span>{formData.location || 'New York, USA'} • {formData.radius} km radius</span>
                          </div>
                          <span className="font-semibold text-gray-900 text-sm">{formData.price || '$20 / hour'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* About Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">About</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {formData.description || 'Learn guitar from scratch! Perfect for beginners who want to start their musical journey.'}
                    </p>
                    <button className="text-indigo-600 text-sm font-medium mt-1 hover:underline">Read more</button>
                  </div>

                  {/* Details Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Details</h3>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                      <div className="flex justify-between md:justify-start gap-4">
                        <span className="text-gray-500">Experience Level</span>
                        <span className="text-gray-900 font-medium capitalize">{formData.experienceLevel || 'Beginner'}</span>
                      </div>
                      <div className="flex justify-between md:justify-start gap-4">
                        <span className="text-gray-500">Availability</span>
                        <span className="text-gray-900 font-medium capitalize">{formData.availability || 'Weekdays, 6 PM - 9 PM'}</span>
                      </div>
                      <div className="flex justify-between md:justify-start gap-4">
                        <span className="text-gray-500">Radius</span>
                        <span className="text-gray-900 font-medium">{formData.radius} km</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      <span className="text-sm text-gray-500 shrink-0">Tags</span>
                      <div className="flex flex-wrap gap-2">
                        {displayTags.map(tag => (
                          <span key={tag} className="bg-indigo-50/50 text-indigo-600 text-xs px-2.5 py-1 rounded-full border border-indigo-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Notice */}
                  <div className="bg-indigo-50 rounded-xl p-4 flex items-start gap-3 mt-4 border border-indigo-100/50">
                    <Info size={20} className="text-indigo-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-indigo-900/80 leading-relaxed">
                      By publishing, you agree to our <a href="#" className="font-semibold text-indigo-600 hover:underline">Community Guidelines</a> and <a href="#" className="font-semibold text-indigo-600 hover:underline">Terms of Service</a>.
                    </p>
                  </div>

                </div>

                <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
                  <button onClick={prevStep} className="text-gray-500 hover:text-gray-800 font-medium flex items-center gap-2 px-4 py-2 transition-colors text-sm">
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm shadow-sm shadow-indigo-200">
                    Publish Listing <Rocket size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-10 px-6 mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl mb-3">
              <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center text-white">
                <span className="text-lg">⌘</span>
              </div>
              SkillSphere
            </div>
            <p className="text-sm text-gray-500">Exchange skills. Build community.</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm">Platform</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-indigo-600">Features</a></li>
              <li><a href="#" className="hover:text-indigo-600">Courses</a></li>
              <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
              <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-600">Press</a></li>
              <li><a href="#" className="hover:text-indigo-600">Partners</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm">Legal & Support</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-indigo-600">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">© 2024 SkillSphere. All rights reserved.</p>
          <div className="flex gap-4 text-gray-400">
            {/* Social icons placeholders */}
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors"><span className="text-xs font-serif">f</span></div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors"><span className="text-xs font-serif">t</span></div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors"><span className="text-xs font-serif">in</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
}