package com.telecom.sim.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "sim_cards")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimCard {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "sim_number", unique = true, nullable = false)
    private String simNumber;
    
    @Column(name = "phone_number", unique = true)
    private String phoneNumber;
    
    @Column(name = "user_id")
    private Long userId;
    
    @Column(name = "plan_id")
    private Long planId;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SimStatus status;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "network_type")
    private NetworkType networkType;
    
    @Column(name = "data_used_mb")
    private Long dataUsedMb = 0L;
    
    @Column(name = "data_limit_mb")
    private Long dataLimitMb;
    
    @Column(name = "signal_strength")
    private Integer signalStrength = 100;
    
    @Column(name = "last_location")
    private String lastLocation;
    
    @Column(name = "activation_date")
    private LocalDateTime activationDate;
    
    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = SimStatus.INACTIVE;
        }
        if (networkType == null) {
            networkType = NetworkType.FOUR_G;
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum SimStatus {
        ACTIVE, INACTIVE, SUSPENDED, EXPIRED, PENDING_ACTIVATION
    }
    
    public enum NetworkType {
        TWO_G("2G"), THREE_G("3G"), FOUR_G("4G"), FIVE_G("5G");
        
        private final String displayName;
        
        NetworkType(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
}
