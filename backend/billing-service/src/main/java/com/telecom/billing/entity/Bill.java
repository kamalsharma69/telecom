package com.telecom.billing.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bills")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String month;
    private BigDecimal amount;
    private String status;
    private LocalDate dueDate;
    private LocalDate paidDate;
    private String planName;
    private String dataUsage;
    private LocalDateTime createdAt;

    public Bill() {
        this.createdAt = LocalDateTime.now();
    }

    public Bill(Long userId, String month, BigDecimal amount, String status, LocalDate dueDate, String planName, String dataUsage) {
        this();
        this.userId = userId;
        this.month = month;
        this.amount = amount;
        this.status = status;
        this.dueDate = dueDate;
        this.planName = planName;
        this.dataUsage = dataUsage;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public LocalDate getPaidDate() { return paidDate; }
    public void setPaidDate(LocalDate paidDate) { this.paidDate = paidDate; }

    public String getPlanName() { return planName; }
    public void setPlanName(String planName) { this.planName = planName; }

    public String getDataUsage() { return dataUsage; }
    public void setDataUsage(String dataUsage) { this.dataUsage = dataUsage; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
