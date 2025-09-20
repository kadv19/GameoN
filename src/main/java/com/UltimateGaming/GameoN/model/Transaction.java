package com.UltimateGaming.GameoN.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Document(collection = "transactions")
public class Transaction {

    @Id
    private String id;

    @NotNull(message = "Member ID is required")
    private ObjectId memberId;

    @NotNull(message = "Game ID is required")
    private ObjectId gameId;

    @NotNull(message = "Amount is required")
    private double amount;

    private LocalDateTime timestamp;

    // Constructors
    public Transaction() {
        this.timestamp = LocalDateTime.now();
    }

    public Transaction(ObjectId memberId, ObjectId gameId, double amount) {
        this.memberId = memberId;
        this.gameId = gameId;
        this.amount = amount;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public ObjectId getMemberId() { return memberId; }
    public void setMemberId(ObjectId memberId) { this.memberId = memberId; }

    public ObjectId getGameId() { return gameId; }
    public void setGameId(ObjectId gameId) { this.gameId = gameId; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
