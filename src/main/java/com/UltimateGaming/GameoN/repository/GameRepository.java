package com.UltimateGaming.GameoN.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.UltimateGaming.GameoN.model.Game;

public interface GameRepository extends MongoRepository<Game, String> {
}