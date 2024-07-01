package gityeong.CashReceipt.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import gityeong.CashReceipt.entity.CashReceipt;

public interface CashReceiptRepository extends JpaRepository<CashReceipt, Long>{
}
