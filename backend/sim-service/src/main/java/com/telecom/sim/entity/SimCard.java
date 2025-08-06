package com.telecom.sim.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sim_cards")
public class SimCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String number;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Long userId;
    private Long planId;
    private String planName;
    
    private String dataUsed = "0GB";
    private String dataTotal;
    
    private LocalDateTime activationDate;
    private LocalDateTime expiryDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public enum Status {
        ACTIVE, INACTIVE, SUSPENDED, EXPIRED
    }

    // Constructors
    public SimCard() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = Status.INACTIVE;
    }

    public SimCard(String number, Long userId, Long planId, String planName, String dataTotal) {
        this();
        this.number = number;
        this.userId = userId;
        this.planId = planId;
        this.planName = planName;
        this.dataTotal = dataTotal;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getPlanId() { return planId; }
    public void setPlanId(Long planId) { this.planId = planId; }

    public String getPlanName() { return planName; }
    public void setPlanName(String planName) { this.planName = planName; }

    public String getDataUsed() { return dataUsed; }
    public void setDataUsed(String dataUsed) { this.dataUsed = dataUsed; }

    public String getDataTotal() { return dataTotal; }
    public void setDataTotal(String dataTotal) { this.dataTotal = dataTotal; }

    public LocalDateTime getActivationDate() { return activationDate; }
    public void setActivationDate(LocalDateTime activationDate) { this.activationDate = activationDate; }

    public LocalDateTime getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDateTime expiryDate) { this.expiryDate = expiryDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
