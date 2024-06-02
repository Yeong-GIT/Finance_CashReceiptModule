package gityeong.CashReceipt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import gityeong.CashReceipt.entity.CashReceipt;

public interface CashReceiptRepository extends JpaRepository<CashReceipt, Long>{

}
