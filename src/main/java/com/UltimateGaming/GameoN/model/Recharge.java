package com.UltimateGaming.GameoN.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Document(collection = "recharges")
public class Recharge {

    @Id
    private String id;

    @NotNull(message = "Member ID is required")
    private ObjectId memberId;   // 👈 FIX: use ObjectId instead of String

    @NotNull(message = "Amount is required")
    private double amount;

    private LocalDateTime dateTime;

    public Recharge() {
        this.dateTime = LocalDateTime.now();
    }

    public Recharge(ObjectId memberId, double amount) {
        this.memberId = memberId;
        this.amount = amount;
        this.dateTime = LocalDateTime.now();
    }

    // getters & setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public ObjectId getMemberId() { return memberId; }
    public void setMemberId(ObjectId memberId) { this.memberId = memberId; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public LocalDateTime getDateTime() { return dateTime; }
    public void setDateTime(LocalDateTime dateTime) { this.dateTime = dateTime; }
}
