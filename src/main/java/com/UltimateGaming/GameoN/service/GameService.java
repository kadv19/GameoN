package com.UltimateGaming.GameoN.service;

import com.UltimateGaming.GameoN.dto.GameDto;
import com.UltimateGaming.GameoN.model.Game;
import com.UltimateGaming.GameoN.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class GameService {

    private static final Logger logger = LoggerFactory.getLogger(GameService.class);

    private final GameRepository gameRepository;

    @Autowired
    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Game createGame(GameDto gameDto) {
        logger.info("Received request to create a new game: {}", gameDto.getName());

        Game game = new Game();
        game.setName(gameDto.getName());
        game.setDescription(gameDto.getDescription());
        game.setPrice(gameDto.getPrice());

        Game savedGame = gameRepository.save(game);
        logger.info("Successfully created and saved a new game with ID: {}", savedGame.getId());

        return savedGame;
    }
}
