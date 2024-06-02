package gityeong.CashReceipt.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CashReceipt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String customerName;
    private BigDecimal amount;
    private LocalDate receiptDate;
    
    public CashReceipt(Long id, String customerName, BigDecimal amount, LocalDate receiptDate) {
        this.id = id;
        this.customerName = customerName;
        this.amount = amount;
        this.receiptDate = receiptDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getReceiptDate() {
        return receiptDate;
    }

    public void setReceiptDate(LocalDate receiptDate) {
        this.receiptDate = receiptDate;
    }

    @Override
    public String toString() {
        return "CashReceipt [id=" + id + ", customerName=" + customerName + ", amount=" + amount + ", receiptDate="
                + receiptDate + "]";
    }

    
}
