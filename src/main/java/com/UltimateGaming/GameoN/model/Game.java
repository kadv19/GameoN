package com.UltimateGaming.GameoN.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Document(collection = "games")
public class Game {

    @Id
    private String id;

    @NotBlank(message = "Title cannot be blank")
    private String title;

    @NotBlank(message = "Genre cannot be blank")
    private String genre;

    @NotNull(message = "Price is required")
    private double price;

    // Constructors
    public Game() {}

    public Game(String title, String genre, double price) {
        this.title = title;
        this.genre = genre;
        this.price = price;
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}