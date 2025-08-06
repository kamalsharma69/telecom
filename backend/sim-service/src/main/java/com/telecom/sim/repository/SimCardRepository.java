package com.telecom.sim.repository;

import com.telecom.sim.entity.SimCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SimCardRepository extends JpaRepository<SimCard, Long> {
    
    Optional<SimCard> findBySimNumber(String simNumber);
    
    List<SimCard> findByUserId(Long userId);
    
    List<SimCard> findByStatus(SimCard.SimStatus status);
    
    boolean existsBySimNumber(String simNumber);
    
    boolean existsByPhoneNumber(String phoneNumber);
    
    @Query("SELECT s FROM SimCard s WHERE s.userId = ?1 AND s.status = 'ACTIVE'")
    List<SimCard> findActiveSimsByUserId(Long userId);
    
    @Query("SELECT COUNT(s) FROM SimCard s WHERE s.status = 'ACTIVE'")
    long countActiveSims();
    
    @Query("SELECT COUNT(s) FROM SimCard s WHERE s.status = 'PENDING_ACTIVATION'")
    long countPendingActivations();
    
    @Query("SELECT s FROM SimCard s WHERE s.status = 'PENDING_ACTIVATION' ORDER BY s.createdAt ASC")
    List<SimCard> findPendingActivationRequests();
}
