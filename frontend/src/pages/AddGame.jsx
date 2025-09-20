import React, { useState } from 'react';
import { gamesAPI } from '../services/api';
import { Plus, Gamepad2, DollarSign, FileText, Users, CheckCircle } from 'lucide-react';

const AddGame = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    minPlayers: 1,
    multipleAllowed: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Game name is required';
    if (!formData.description.trim()) return 'Description is required';
    if (!formData.price || parseFloat(formData.price) <= 0) return 'Valid price is required';
    if (!formData.minPlayers || parseInt(formData.minPlayers) < 1) return 'Minimum players must be at least 1';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const gameData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        minPlayers: parseInt(formData.minPlayers),
        multipleAllowed: formData.multipleAllowed
      };

      await gamesAPI.create(gameData);
      setSuccess('Game added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        minPlayers: 1,
        multipleAllowed: false
      });
    } catch (error) {
      console.error('Error adding game:', error);
      setError(
        error.response?.data || 
        'Failed to add game. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-gaming-accent to-gaming-gold rounded-full flex items-center justify-center">
              <Plus className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="font-gaming text-3xl font-bold text-white mb-2">
            Add New Game
          </h1>
          <p className="text-white/70">Create an exciting new gaming experience</p>
        </div>

        {/* Add Game Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-green-200 text-sm flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>{success}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Game Name *
              </label>
              <div className="relative">
                <Gamepad2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter game name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Description *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="input-field pl-10 resize-none"
                  placeholder="Describe the game, rules, and what makes it exciting..."
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Price per Play *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Minimum Players *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type="number"
                    name="minPlayers"
                    value={formData.minPlayers}
                    onChange={handleChange}
                    className="input-field pl-10"
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Multiple Plays Allowed */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="multipleAllowed"
                name="multipleAllowed"
                checked={formData.multipleAllowed}
                onChange={handleChange}
                className="w-4 h-4 text-gaming-accent bg-white/10 border-white/30 rounded focus:ring-gaming-accent focus:ring-2"
              />
              <label htmlFor="multipleAllowed" className="text-white/80 text-sm">
                Allow multiple plays by the same member
              </label>
            </div>

            {/* Game Preview */}
            <div className="bg-gaming-accent/10 border border-gaming-accent/30 rounded-lg p-4">
              <h3 className="text-gaming-accent font-semibold mb-3">Game Preview:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Name:</span>
                  <span className="text-white">{formData.name || 'Game Name'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Price:</span>
                  <span className="text-gaming-gold font-semibold">
                    ${formData.price || '0.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Min Players:</span>
                  <span className="text-white">{formData.minPlayers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Multiple Plays:</span>
                  <span className={formData.multipleAllowed ? 'text-green-400' : 'text-red-400'}>
                    {formData.multipleAllowed ? 'Allowed' : 'Not Allowed'}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full btn-primary flex items-center justify-center space-x-2 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Plus className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Adding Game...' : 'Add Game'}</span>
            </button>
          </form>

          {/* Tips */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <h4 className="text-white font-medium mb-2">💡 Tips for Great Games:</h4>
            <ul className="text-xs text-white/60 space-y-1">
              <li>• Write clear, engaging descriptions that explain the game mechanics</li>
              <li>• Set competitive but fair pricing based on game complexity</li>
              <li>• Consider the target audience when setting minimum players</li>
              <li>• Enable multiple plays for skill-based or addictive games</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGame;