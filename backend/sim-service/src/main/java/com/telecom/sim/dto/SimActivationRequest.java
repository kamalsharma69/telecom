package com.telecom.sim.dto;

import com.telecom.sim.entity.SimCard;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class SimActivationRequest {
    
    @NotBlank(message = "SIM number is required")
    @Pattern(regexp = "\\d{20}", message = "SIM number must be 20 digits")
    private String simNumber;
    
    @NotNull(message = "User ID is required")
    private Long userId;
    
    @NotNull(message = "Plan ID is required")
    private Long planId;
    
    private SimCard.NetworkType networkType = SimCard.NetworkType.FOUR_G;
    
    private String phoneNumber;
    private String location;
}
