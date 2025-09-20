package com.UltimateGaming.GameoN.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Document(collection = "games")
public class Game {

    @Id
    private String id;

    @NotBlank(message = "Name cannot be blank")
    private String name;

    @NotBlank(message = "Description cannot be blank")
    private String description;

    @NotNull(message = "Price is required")
    private double price;

    private int minPlayers = 1;
    private boolean multipleAllowed = false;

    // Constructors
    public Game() {}

    public Game(String name, String description, double price) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.minPlayers = 1;
        this.multipleAllowed = false;
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getMinPlayers() { return minPlayers; }
    public void setMinPlayers(int minPlayers) { this.minPlayers = minPlayers; }

    public boolean isMultipleAllowed() { return multipleAllowed; }
    public void setMultipleAllowed(boolean multipleAllowed) { this.multipleAllowed = multipleAllowed; }
}
