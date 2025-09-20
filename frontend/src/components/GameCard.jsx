import React, { useState } from 'react';
import { Play, DollarSign, Users, Info } from 'lucide-react';
import { transactionsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const GameCard = ({ game, onPlay, showPlayButton = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useAuth();

  const handlePlay = async () => {
    if (!user || !user.username) {
      alert('Please login to play games');
      return;
    }

    setIsPlaying(true);
    try {
      // First get the member ID from the backend
      const memberResponse = await membersAPI.searchByUsername(user.username);
      if (!memberResponse.data) {
        throw new Error('Member not found');
      }
      
      await transactionsAPI.create({
        memberId: memberResponse.data.id,
        gameId: game.id,
        amount: game.price
      });
      
      if (onPlay) {
        onPlay(game);
      }
      
      alert(`Successfully played ${game.name}! Amount: $${game.price}`);
    } catch (error) {
      console.error('Error playing game:', error);
      alert('Failed to play game. Please try again.');
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <div className="card group hover:scale-105 transition-all duration-300">
      <div className="flex flex-col h-full">
        {/* Game Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gaming-accent transition-colors">
              {game.name}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-white/70">
              <div className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4" />
                <span>${game.price}</span>
              </div>
              {game.minPlayers && (
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{game.minPlayers}+ players</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Game Icon */}
          <div className="w-12 h-12 bg-gradient-to-br from-gaming-accent to-gaming-gold rounded-lg flex items-center justify-center">
            <Play className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Game Description */}
        <div className="flex-1 mb-4">
          <div className="flex items-start space-x-2">
            <Info className="h-4 w-4 text-white/50 mt-0.5 flex-shrink-0" />
            <p className="text-white/80 text-sm leading-relaxed">
              {game.description || 'No description available'}
            </p>
          </div>
        </div>

        {/* Action Button */}
        {showPlayButton && (
          <div className="mt-auto">
            <button
              onClick={handlePlay}
              disabled={isPlaying}
              className={`w-full btn-primary flex items-center justify-center space-x-2 ${
                isPlaying ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Play className={`h-4 w-4 ${isPlaying ? 'animate-spin' : ''}`} />
              <span>{isPlaying ? 'Playing...' : 'Play Now'}</span>
            </button>
          </div>
        )}

        {/* Additional Info */}
        {game.multipleAllowed && (
          <div className="mt-2 text-xs text-gaming-gold text-center">
            ✨ Multiple plays allowed
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;