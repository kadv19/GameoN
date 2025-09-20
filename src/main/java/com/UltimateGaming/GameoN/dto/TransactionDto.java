package com.UltimateGaming.GameoN.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TransactionDto {

    @NotBlank(message = "Member ID is required")
    private String memberId;

    @NotBlank(message = "Game ID is required")
    private String gameId;

    @NotNull(message = "Amount is required")
    private double amount;

    // Constructors
    public TransactionDto() {}

    public TransactionDto(String memberId, String gameId, double amount) {
        this.memberId = memberId;
        this.gameId = gameId;
        this.amount = amount;
    }

    // Getters and setters
    public String getMemberId() { return memberId; }
    public void setMemberId(String memberId) { this.memberId = memberId; }

    public String getGameId() { return gameId; }
    public void setGameId(String gameId) { this.gameId = gameId; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}
