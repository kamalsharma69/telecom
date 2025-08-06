package com.telecom.sim.dto;

import com.telecom.sim.entity.SimCard;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimCardDto {
    
    private Long id;
    private String simNumber;
    private String phoneNumber;
    private Long userId;
    private Long planId;
    private SimCard.SimStatus status;
    private SimCard.NetworkType networkType;
    private Long dataUsedMb;
    private Long dataLimitMb;
    private Integer signalStrength;
    private String lastLocation;
    private LocalDateTime activationDate;
    private LocalDateTime expiryDate;
    private Double dataUsedGb;
    private Double dataLimitGb;
    private String speed;
    
    // Calculate GB values from MB
    public Double getDataUsedGb() {
        return dataUsedMb != null ? dataUsedMb / 1024.0 : 0.0;
    }
    
    public Double getDataLimitGb() {
        return dataLimitMb != null ? dataLimitMb / 1024.0 : 0.0;
    }
    
    public String getSpeed() {
        if (networkType != null) {
            switch (networkType) {
                case FIVE_G: return "500 Mbps";
                case FOUR_G: return "100 Mbps";
                case THREE_G: return "21 Mbps";
                case TWO_G: return "384 Kbps";
                default: return "Unknown";
            }
        }
        return "Unknown";
    }
}
